export class Row {
	private text: string;

	constructor(args?: { text: string }) {
		if (args) {
			this.text = args.text;
		}
	}

	public getText() {
		return this.text;
	}

	public setText(newText: string) {
		this.text = newText;
	}
}
