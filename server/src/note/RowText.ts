import { Row } from "./Row.ts";

export class RowText extends Row {
	private text: string;

	constructor(args?: { text: string }) {
		super();
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
