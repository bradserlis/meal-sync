import React, { Component } from 'react';
import { Image } from 'react-native';
import { Title, Headline, Paragraph, Button } from 'react-native-paper';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';


import { globalStyles, dimensions } from '../../globalStyles'

export default class MealSyncCardsContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      roomLocation: null,
      nearbyResults: this.setSeedData(),
      userResponses: []
    }
  }

  setSeedData = () => {
    
    let seedResults = [
    {  
      "business_status": "OPERATIONAL",
      "geometry":   {
        "location":   {
          "lat": 37.931868,
          "lng": -121.6957863,
        },
        "viewport":   {
          "northeast":   {
            "lat": 37.9332011802915,
            "lng": -121.6944660697085,
          },
          "southwest":   {
            "lat": 37.93050321970851,
            "lng": -121.6971640302915,
          },
        },
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "de423dff025cf6272fd2191509e170b33e50aef2",
      "name": "Panda Express",
      "place_id": "ChIJB91oBxf_j4ARo5qB52q7Y54",
      "plus_code":   {
        "compound_code": "W8J3+PM Brentwood, CA, USA",
        "global_code": "849WW8J3+PM",
      },
      "reference": "ChIJB91oBxf_j4ARo5qB52q7Y54",
      "scope": "GOOGLE",
      "types":  [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      "vicinity": "Brentwood",
    },
    {
      "business_status": "OPERATIONAL",
      "geometry":   {
        "location":   {
          "lat": 37.931868,
          "lng": -121.6957863,
        },
        "viewport":   {
          "northeast":   {
            "lat": 37.9332011802915,
            "lng": -121.6944660697085,
          },
          "southwest":   {
            "lat": 37.93050321970851,
            "lng": -121.6971640302915,
          },
        },
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "1879598478b823c3ed050d587dcfe788496821c3",
      "name": "Greek Restaurant",
      "place_id": "ChIJu-Gadl__j4ARtIqDGMnq-gc",
      "plus_code":   {
        "compound_code": "W8J3+PM Brentwood, CA, USA",
        "global_code": "849WW8J3+PM",
      },
      "reference": "ChIJu-Gadl__j4ARtIqDGMnq-gc",
      "scope": "GOOGLE",
      "types":  [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      "vicinity": "Brentwood",
    },
     {
      "business_status": "OPERATIONAL",
      "geometry":   {
        "location":   {
          "lat": 37.9325,
          "lng": -121.6958333,
        },
        "viewport":   {
          "northeast":   {
            "lat": 37.9337212802915,
            "lng": -121.6944623197085,
          },
          "southwest":   {
            "lat": 37.9310233197085,
            "lng": -121.6971602802915,
          },
        },
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "6f017e70a1df4cf854d0aa94d9fc05a2290a0e54",
      "name": "La Costa Taqueria",
      "opening_hours":  {
        "open_now": true,
      },
      "photos":  [
         {
          "height": 2988,
          "html_attributions":  [
            "<a href=\"https://maps.google.com/maps/contrib/104116989904387482995\">Jose Sanchez</a>",
          ],
          "photo_reference": "CmRaAAAAOaTNzGND5HxNuOjKBX8m9WGAM4GC831v4XtJTnfoS57betY9RN9p2MSYehGbD-1bynp4EDPwn4E3nHj4-rCN-Xo40aqNFeTtkEQjXZQBXkjhAtMfo3IBXje0x8C6SlTREhAshAhhzUHBIMehwQhy6Y0jGhTx-R0XFFDugU2WPHSWW9jMM1ap0w",
          "width": 5312,
        },
      ],
      "place_id": "ChIJ7_cfcZX-j4AR35cuA50I-gU",
      "plus_code":   {
        "compound_code": "W8M3+2M Brentwood, CA, USA",
        "global_code": "849WW8M3+2M",
      },
      "price_level": 1,
      "rating": 4.4,
      "reference": "ChIJ7_cfcZX-j4AR35cuA50I-gU",
      "scope": "GOOGLE",
      "types":  [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      "user_ratings_total": 764,
      "vicinity": "335 Oak Street, Brentwood",
    },
    {
      "business_status": "OPERATIONAL",
      "geometry":   {
        "location":   {
          "lat": 37.9322516,
          "lng": -121.6948322,
        },
        "viewport":   {
          "northeast":   {
            "lat": 37.93366288029151,
            "lng": -121.6933693197085,
          },
          "southwest":   {
            "lat": 37.93096491970851,
            "lng": -121.6960672802915,
          },
        },
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "name": "MJ's Downtown Cafe",
      "opening_hours":   {
        "open_now": true,
      },
      "photos":  [
          {
          "height": 3006,
          "html_attributions":  [
            "<a href=\"https://maps.google.com/maps/contrib/106003925817197549747\">Lynne Kelsey</a>",
          ],
          "photo_reference": "CmRaAAAAFuTvuoYP_GcY7kHb4FcrZTxRRO3xyF5x4YDKuAHI5HxrWQKDG-pdKPw0H57BSScDxfNP-UqUjMAUq_mNNdasqaI7v0o_TcSB-7mfcx4psgGbp9jhRCVqJippSxgPGHaFEhCujut-ekYale6YaXwuyTmeGhRHo8QHMvACNwSdd2ktR0yPyqh0yQ",
          "width": 5344,
        },
      ],
      "place_id": "ChIJc5Tip5X-j4ARXSXJr3tOxvo",
      "plus_code":   {
        "compound_code": "W8J4+W3 Brentwood, CA, USA",
        "global_code": "849WW8J4+W3",
      },
      "price_level": 2,
      "rating": 4.5,
      "reference": "ChIJc5Tip5X-j4ARXSXJr3tOxvo",
      "scope": "GOOGLE",
      "types":  [
        "restaurant",
        "cafe",
        "food",
        "point_of_interest",
        "establishment",
      ],
      "user_ratings_total": 487,
      "vicinity": "655 1st Street, Brentwood",
    },
    {
      "business_status": "OPERATIONAL",
      "geometry":   {
        "location":   {
          "lat": 37.932673,
          "lng": -121.6951387,
        },
        "viewport":   {
          "northeast":   {
            "lat": 37.9340105302915,
            "lng": -121.6936522697085,
          },
          "southwest":   {
            "lat": 37.9313125697085,
            "lng": -121.6963502302915,
          },
        },
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "name": "Sweeney's Grill And Bar",
      "opening_hours":   {
        "open_now": true,
      },
      "photos":  [
          {
          "height": 1840,
          "html_attributions":  [
            "<a href=\"https://maps.google.com/maps/contrib/104926402819691099300\">Kerry Adamo</a>",
          ],
          "photo_reference": "CmRaAAAAUKwuXOywegD9R8tt4gIg5YLpXXzFZHsvoYtb5w9U_XOVmcpw0yVq-bkG2lsviw37hvg6UNGBK9EAtd6nLwJu9fYtax7twoSOLDSUtokyjCN28teDw7vCt0T_PvC7GlO9EhAgiaXAJLwrO1V9kc-2_IruGhQIUqLre_EzEne8dVpuHOZ2WuBAkg",
          "width": 3264,
        },
      ],
      "place_id": "ChIJr7QQDZX-j4AR_sJnKwtrbrw",
      "plus_code":   {
        "compound_code": "W8M3+3W Brentwood, CA, USA",
        "global_code": "849WW8M3+3W",
      },
      "price_level": 2,
      "rating": 4.5,
      "reference": "ChIJr7QQDZX-j4AR_sJnKwtrbrw",
      "scope": "GOOGLE",
      "types":  [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "store",
        "establishment",
      ],
      "user_ratings_total": 425,
      "vicinity": "301 Oak Street, Brentwood",
    },
    {
      "business_status": "OPERATIONAL",
      "geometry":   {
        "location":   {
          "lat": 37.9328854,
          "lng": -121.6956539,
        },
        "viewport":   {
          "northeast":   {
            "lat": 37.9343446302915,
            "lng": -121.6941196697085,
          },
          "southwest":   {
            "lat": 37.9316466697085,
            "lng": -121.6968176302915,
          },
        },
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "c72a77d5a15c906aac545cc0fa83e3aedd8e573c",
      "name": "Dinos Sandwich Shop",
      "opening_hours":   {
        "open_now": true,
      },
      "photos":  [
          {
          "height": 2988,
          "html_attributions":  [
            "<a href=\"https://maps.google.com/maps/contrib/116314647972721242489\">Roy Richards</a>",
          ],
          "photo_reference": "CmRaAAAA-tGqUUxrsAxWzoph3RKyqyWvTGvupI6DeZmdlDf5zi-H9ZlPnnnKvukOau0uFQypmgEY-8zZvaWVOrLMAw3JXxDLjYfXiyhYSo6qOAjNEHotXJhQVavefNNq3Fn6yRvfEhApKRdn1LkVcmBYSJUoS2huGhSAKDabJX74WVQKgtErtU_IFKM0hg",
          "width": 5312,
        },
      ],
      "place_id": "ChIJOSB1bZX-j4ARIFXNbHJCjgE",
      "plus_code":   {
        "compound_code": "W8M3+5P Brentwood, CA, USA",
        "global_code": "849WW8M3+5P",
      },
      "price_level": 1,
      "rating": 4.8,
      "reference": "ChIJOSB1bZX-j4ARIFXNbHJCjgE",
      "scope": "GOOGLE",
      "types":  [
        "meal_takeaway",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      "user_ratings_total": 219,
      "vicinity": "729 1st Street, Brentwood",
    },
 ]  
  return seedResults;
}

  componentDidMount = () => {
    // !this.state.nearbyResults && /*this.getMealSyncCards()*/ this.setState({nearbyResults:seedResults})
   this.state.nearbyResults && this.state.nearbyResults.map((result) => {
      console.log('each result', result)
    })
  }

  // const [roomLocation] = useState(navigation.getParam('room').location)
  // const [nearbyResults, setNearbyResults] = useState([])
  // useEffect(() => {
  //   console.log('update mealsync cards container', navigation.getParam("room"))
  //   console.log('we still have the api key', process.env.GOOGLE_API_KEY)
  //   // console.log('but do we have roomLocation?', roomLocation)
  //   // getMealSyncCards()
  // }, [])

  getMealSyncCards = () => {
    console.log('call getMealSyncCards')
    // ${roomLocation.latitude},${roomLocation.longitude}
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.931868,-121.6957863&rankby=distance&type=restaurant&key=${process.env.GOOGLE_API_KEY}`)
    .then(response => response.json())
    .then(data => this.setState({
      nearbyResults: data.results
    }, () => console.log('set the real results', this.state.nearbyResults)
    ))
  }

  swipeLogic = (name: string, num: number) => {
    let responseObj = {}
    console.log('No to', name);
    this.setState({
      userResponses: [...this.state.userResponses, {[name]: num}]
    }, () => console.log('responses', this.state.userResponses))
  }

  onSwipeLeft = (name: string) => {
    this.swipeLogic(name, 1)
  }

  onSwipeRight = (name: string) => {
    this.swipeLogic(name, 0)
  }

  render(){
    const { navigate } = this.props.navigation;
    console.log('props', this.props)  
    
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.dividerDiv}>
          <Headline> Meal Sync Groups </Headline>
        </View>
        <View>
          <DeckSwiper
            dataSource={this.state.nearbyResults}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail 
                    source={{uri: item.icon}} />
                    <Body>
                      <Text>{item.name}</Text>
                      <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={{uri: item.icon}} />
                </CardItem>
                <CardItem>
                  <Text>{item.vicinity}</Text>
                </CardItem>
              </Card>
            }
            onSwipeRight={(item) => this.onSwipeRight(item.name)}
            onSwipeLeft={(item) => this.onSwipeLeft(item.name)}
          />
        </View>
      </View>  
    )
  }
}
