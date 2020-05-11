import React, {Component} from "react";
import {withAuth} from "../Auth";

class Storage extends Component {
    render () {
        return (
            <div className="container-fluid align-items-center">
                <h1>Складские помещения</h1>
                {/*<p>Классификация, основанная на технических параметрах
                  площадей, развитости инфраструктуры, включая инженерные коммуникации</p>*/}
            </div>
        )
    }
}

export default withAuth(Storage);
