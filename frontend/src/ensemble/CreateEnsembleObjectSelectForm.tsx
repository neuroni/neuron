import * as React from "react";

export class CreateEnsembleObjectSelectForm extends React.Component {
    public state = {
        selectedEnsembleObjectType: ""
    }

    public render() {
        return (
            <div>
                <select value={this.state.selectedEnsembleObjectType}
                    onChange={e => {
                        this.setState({
                            selectedEnsembleObjectType: e.target.value
                        })
                    }}>
                    <option value="Ensemble">
                        Kokonaisuus
                    </option>
                    <option value="Note">
                        Muistilappu
                    </option>
                </select>
                <button>
                    Luo
                </button>
            </div>
        )
    }
}