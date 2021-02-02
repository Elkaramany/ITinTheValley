import React from 'react'
import EditorApproval from './ApprovedArticlesEditor';
 
interface Props{

}
 
const EditorApproved: React.FC<Props> = props =>{
    return <EditorApproval headerTitle={'All approved Articles'} articleApproval={true} />
}
 
 
export default EditorApproved;