import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";


const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: "https://i.ibb.co/wsrFQsc/vecteezy-queso-mozzarella-queso-pelotas-con-hoja-en-transparente-26791837.png",
      name: "Mozzarella",
    },
    {
      id: "1",
      image:
        "https://i.ibb.co/GW1nCsX/cheese-48409.png",
      name: "Ricotta",
    },
    {
      id: "3",
      image:
        "https://i.ibb.co/Gx33ZKt/cheese-48415.png",
      name: "Aged",
    },
    {
      id: "4",
      image:
        "https://i.ibb.co/ct9Gjgy/cheese-48392.png",
      name: "Alpine ",
    },
    {
      id: "5",
      image:
        "https://i.ibb.co/6svcq31/cheese-48402.png",
      name: "Feta",
    },
    {
      id: "6",
      image: "https://i.ibb.co/R9Cgp3k/585e8e02cb11b227491c34c0-2.png",
      name: "Cheddar",
    },
  ];
  const images = [
    "https://borjlella.com/fr/wp-content/uploads/2019/01/fromagerieborjlella001.jpg",
    "https://borjlella.com/fr/wp-content/uploads/2020/11/Fromage_feta.jpg",
    "https://borjlella.com/fr/wp-content/uploads/2019/01/borjlella0055.jpg",
  ];
 
  const offers = [
    {
      id: "0",
      title:
        "Borj Lella",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/326487472_1593077107799742_1522439988649192557_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rJKEBOpwtvgQ7kNvgFYgfe7&_nc_ht=scontent.ftun16-1.fna&oh=00_AfB-hdi4eZtewAmRo80OYTkeq_6Ahday4TpryM3P3QZo6w&oe=663AA353",
      carouselImages: [
        "https://borjlella.com/fr/wp-content/uploads/2019/01/Borjlella001.jpg",
        "https://borjlella.com/fr/wp-content/uploads/2019/01/Borjlella005.jpg",
        "https://borjlella.com/fr/wp-content/uploads/2019/01/Table-borjella.jpg",
        "https://borjlella.com/fr/wp-content/uploads/2019/01/carborjlella.jpg",
      ],
      color: "23163025",
      size: "Beja",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(true);
  const [addresses, setAddresses] = useState([]);
  
  const [category, setCategory] = useState("Electronics");
  const [items, setItems] = useState([
    { label: "Electronics", value: "Electronics" },
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    
    { label: "women's clothing", value: "women's clothing" },
  ]);


  

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.14:4001/api/food/list');
      setProducts(response.data.data);
     } catch (err) {
      console.log(err.message);
      
    }
  };
    fetchData();
  }, []);
  console.log(products);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

 

  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);

  
  
  return (
    <>
      <SafeAreaView
        style={{
          paddinTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >



        <ScrollView>
          <View
            style={{
              backgroundColor: "#00CED1",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Search Amazon.in" />
            </Pressable>

            <Feather name="mic" size={24} color="black" />
          </View>

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#AFEEEE",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />

            <Pressable>
            
                <Text>
                  Deliver to 
                </Text>
             
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    Add a Address
                </Text>
             
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <SliderBox
            images={images}
            autoPlay
            circleLoop
            dotColor={"#13274F"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
          />




          

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Store
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />

                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    BORJ
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>




      </SafeAreaView>

     
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
