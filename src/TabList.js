import Tab from "./Tab";
import {useState} from "react";


function TabList(props) {
    // const [activeTab, setActiveTab] = useState(props.children[0].key);

    return <div className="tabs">
        <ol className="tab-list">
            {props.tabsList.map(child =>
                // <Tab key={child.key}
                <Tab
                     // label={child.key}
                    label={`Tab ${child}`}
                     activeTab={props.activeTab}
                     onClickTab={(child) => props.setActiveTab(child)}/>)}
            <button onClick={props.onNewListAdded}>New List</button>
        </ol>
        {/*{props.children.map(child => props.activeTab === child.listNumber && child)}*/}

    </div>;
}

export default TabList;