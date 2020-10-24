import React, {useState, useEffect} from 'react';
import { useStateValue } from "../components/State";
import {View, Text, StyleSheet, Button, Platform, ActivityIndicator} from 'react-native';
import { Link } from "../components/Link"; 
import { RichText } from "../components/RichText"; 
import { getStyles, Theme, getContent } from '../utils';


function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();
    const styles = StyleSheet.create(getStyles('text_header2, text_header4, section, content', {isWeb}));
    console.log('page props', props)

    const [ pageLoading, setPageLoading ] = useState(props.content ? false: true);
    const [ content, setContent ] = useState(props.content || {});


    if (isWeb) {
        useEffect(() => {
            setTimeout(() => {
                (function(h,b,s,n,i,p,e,t) {
                    let check = document.getElementById('honeybook-form');
                    if (check){ check.parentNode.removeChild(check); }
                    h._HB_ = h._HB_ || {};h._HB_.pid = i;;;;
                    t=b.createElement(s);t.type="text/javascript";t.async=!0;t.src=n;
                    t.id = 'honeybook-form';
                    e=b.getElementsByTagName(s)[0];e.parentNode.insertBefore(t,e);
                    console.log("EXECUTED HONEYBOOK CODE")
                })(window,document,"script","https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js?cachebust=" + new Date().getTime(),"5f0282b0a1f62a61eedd0881");
            }, 1000)
        }, [content, pageLoading])
    }

    if (!props.content) {
        useEffect(() => {
            setContent(getContent({type: 'content', uid: 'contact'}).then(_content => {
                console.log('_content', _content)
                setContent(_content.content)
                setPageLoading(false);
            }).catch(err => {
                console.error(err);
            }));
        }, [])
    }

    return (
        <React.Fragment>
        { pageLoading ?
            <View style={{marginTop: 200, marginBottom: 200}}>
                <ActivityIndicator color={Theme.green} size="large" />
            </View>
        : (
            <React.Fragment>
                <View style={[styles.section, {backgroundColor: Theme.green_bg, paddingTop: 180}]}>
                    <View style={[styles.content, {flexDirection: 'column', alignItems: 'center'}]}>
                        <Text accessibilityRole="header" aria-level="2" style={[styles.text_header2, {color: '#fff'}]}>{content.page_title}</Text>
                    </View>
                </View>
                <View style={[styles.section]}>
                    <View style={styles.content}>
                        <RichText render={content._body} isWeb={isWeb} />
                    </View>
                </View>
                {isWeb && <View style={[styles.section]}>
                    <View style={styles.content}>
                        <Text style={styles.text_header4}>Contact Form</Text>
                        <div className="hb-p-5f0282b0a1f62a61eedd0881-2" style={{display: 'inline-block', maxWidth: '100%', minWidth: 600, boxSizing: 'border-box'}}/>
                        <img height="1" width="1" style={{display:'none'}} src="https://www.honeybook.com/p.png?pid=5f0282b0a1f62a61eedd0881" />
                    </View>
                </View>}
            </React.Fragment>
        )}
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Page;