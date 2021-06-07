import React, { Component } from 'react';
import { View, Linking, SectionList, TouchableOpacity, Image } from 'react-native';
import { Header, Text12, Text14 } from '../../../../components';
import { Images, Colors } from '../../../../theme';
import styles from './share.styles'

export default class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  buttonPressed(title) {
    if(title == "email") {
      Linking.openURL(`mailto:`)
  }
  }

  renderButton(image, title) {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={() => this.buttonPressed(title.toLowerCase())}>
        <View style={styles.leftView}>
          <Image source={image} resizeMode='contain' style={styles.listIcon} />
          <Text12 title={title} type="light" />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header back title={"Share with friends"} />
        <SectionList
          style={styles.listStyle}
          sections={
            [{
              title: "Tell a Friend",
              data: [
                { id:0, title: 'Facebook', image: Images.facebook},
                { id:1, title: 'Twitter', image: Images.twitter},
                { id:2, title: 'Email', image: Images.email},
                { id:3, title: 'Whatsapp', image: Images.whatsapp},
              ]
            },
            {
              title: "Find us",
              data: [
                { id:4, title: 'Facebook', image: Images.facebook},
                { id:5, title: 'Instagram', image: Images.instagram},
                { id:6, title: 'Youtube', image: Images.youtube}
              ]
            }]
          }
          renderItem={({ item }) => {
            return this.renderButton(item.image, item.title)
          }}
          renderSectionHeader={({ section: { title } }) => {
            return <Text14 type="light" title={title} addStyle={styles.sectionHeader}/>
          }}
        />
      </View>
    );
  }
}
