import { CreateEnsembleObjectCommand } from "./CreateEnsembleObjectCommand";


export type CreateEnsembleObject = (
    command: CreateEnsembleObjectCommand
) => Promise<void>;

export const createCreateEnsembleObject = (deb: {

}): CreateEnsembleObject => async (command) => {
    
}