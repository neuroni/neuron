export class ObjectParser {
	private data: string;
	private parsing: boolean;
	private intentation: number;
	private onNewObject: (obj: any) => void;

	constructor(onNewObject: (obj: any) => void) {
		this.data = "";
		this.parsing = false;
		this.intentation = 0;
		this.onNewObject = onNewObject;
	}

	public pushChunck(chunk: string) {
		for (const char of chunk) {
			if (!this.parsing) {
				if (char === "{") {
					this.parsing = true;
					this.intentation++;
					this.data += char;
				}
				continue;
			}
			if (char === "{") {
				this.intentation++;
			}
			if (char === "}") {
				this.intentation--;
				if (this.intentation === 0) {
					this.data += char;
					const jData = JSON.parse(this.data);
					this.onNewObject(jData);
					this.data = "";
					this.parsing = false;
					continue;
				}
				this.data += char;
				continue;
			}
			this.data += char;
		}
	}
}
