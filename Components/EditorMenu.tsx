import React from 'react'
import EditorApproval from './ApprovedArticlesEditor';
 
interface Props{

}
 
const EditorMenu: React.FC<Props> = props =>{
    return <EditorApproval headerTitle={'All non-approved Articles'} articleApproval={false} />
}
 
 
export default EditorMenu;