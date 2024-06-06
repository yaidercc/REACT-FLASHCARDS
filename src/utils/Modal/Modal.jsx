import { FormFlashcard } from "./FormFlashcard"
import { FormTopics } from "./FormTopics"

export const Modal = ({title,typeForm}) => {
    return (
        <div>
            <div className="overlay" >
                <div className="modal">
                    <div className="header">
                        <h2 id="title_modal">{title}</h2>
                        <a href="#" className="btn_close" id="btn_close">X</a>
                    </div>
                    <div>
                        {
                            typeForm === "topic "
                            ? <FormTopics/>
                            : <FormFlashcard/>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
