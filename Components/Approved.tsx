import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import EditorApproved from './EditorApproved'
import JournApproved from './JournApproved'
 
interface Props{
    Editor: boolean,
}
 
const Approved: React.FC<Props> = props =>{
    if(props.Editor == true) return <EditorApproved />
    else return <JournApproved />
}
 
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
})
 
const mapStateToProps = ({SignInReducer}) =>{
    return{
        Editor: SignInReducer.Editor
    }
}
 
export default connect(mapStateToProps, {}) (Approved);