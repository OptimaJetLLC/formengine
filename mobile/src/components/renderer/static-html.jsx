import React from 'react';
import { Platform,StyleSheet } from 'react-native';
//import { WebView } from 'react-native-webview';
import HTML from "react-native-render-html";

export default function StaticHtml(props) {
    // todo test on mobile
    const styles = StyleSheet.create({
        a: {
          fontWeight: '300',
          color: '#FF3366', // make links coloured pink
        },
      });

    return <HTML html={props.content} stylesheet={styles} />
    // Platform.select({
    //     native: () => (
    //         //<WebView {...props} originWhitelist={['*']} source={{ html: props.content }}/>
    //         <HTML html={props.content} stylesheet={styles} />),
    //     default: () => (<span {...props} dangerouslySetInnerHTML={{ __html: props.content }}/>),
    // })();
}
