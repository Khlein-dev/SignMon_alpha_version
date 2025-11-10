import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Image, ImageBackground, Modal, } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const Dashboard = () => {
    const [showBottomPanel, setShowBottomPanel] = useState(false);
    const [showRightPanel, setShowRightPanel] = useState(false);
    const [showLeftPanel, setShowLeftPanel] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [isWoof, setIsWoof] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedHat, setSelectedHat] = useState(null);  // From previous context
    const router = useRouter();
    const bottomSlideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const rightSlideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
    const leftSlideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
    const jumpAnim = useRef(new Animated.Value(0)).current;  // For the dog
    const signJumpAnim = useRef(new Animated.Value(0)).current;  // New for the sign image

    const toggleBottomPanel = () => {
        if (showBottomPanel) {
            Animated.timing(bottomSlideAnim, {
                toValue: SCREEN_HEIGHT,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setShowBottomPanel(false));
        } else {
            setShowBottomPanel(true);
            Animated.timing(bottomSlideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const toggleRightPanel = () => {
        if (showRightPanel) {
            Animated.timing(rightSlideAnim, {
                toValue: SCREEN_WIDTH,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setShowRightPanel(false));
        } else {
            setShowRightPanel(true);
            Animated.timing(rightSlideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const toggleLeftPanel = () => {
        if (showLeftPanel) {
            Animated.timing(leftSlideAnim, {
                toValue: -SCREEN_WIDTH,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setShowLeftPanel(false));
        } else {
            setShowLeftPanel(true);
            Animated.timing(leftSlideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const closePanelsOnOverlayTap = () => {
        if (showBottomPanel) toggleBottomPanel();
        if (showRightPanel) toggleRightPanel();
        if (showLeftPanel) toggleLeftPanel();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIsWoof(prev => !prev);
            setShowBubble(true);

            if (isWoof) {
                Animated.sequence([
                    Animated.timing(jumpAnim, {
                        toValue: -20,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(jumpAnim, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]).start();
            } else {
                Animated.sequence([
                    Animated.timing(jumpAnim, {
                        toValue: -15,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(jumpAnim, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(jumpAnim, {
                        toValue: -15,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(jumpAnim, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true,
                    }),
                ]).start();
            }

            setTimeout(() => setShowBubble(false), 1000);
            if (Math.random() < 0.7) {
                doubleJumpSignAnimation();  // pagtalon ng librooo
            }
        }, 7000);
        return () => clearInterval(interval);
    }, [isWoof]);

    // const bubbleText = isWoof ? 'Woof Woof!' : 'Arghh!';

    const doubleJumpSignAnimation = () => {
        Animated.sequence([
            Animated.timing(signJumpAnim, {
                toValue: -20,  // Jump up
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(signJumpAnim, {
                toValue: 0,  // Back to original
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(signJumpAnim, {
                toValue: -20,  // Jump up again for double jump
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(signJumpAnim, {
                toValue: 0,  // Back to original
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (

        <ImageBackground source={require('@/assets/images/background.jpg')} style={styles.container}>
            <Animated.View style={{ transform: [{ translateY: jumpAnim }], position: 'relative' }}>  {/* Added position: 'relative' for absolute positioning of hat */}
                <Image
                    source={require('@/assets/images/pet.png')}
                    style={styles.petImage}
                    resizeMode="contain"
                />
                {selectedHat && (
                    <Image
                        source={
                            selectedHat === 'cowboy' ? require('@/assets/images/cowboy1.png') :
                                selectedHat === 'santa' ? require('@/assets/images/santa2.png') :
                                    selectedHat === 'blackhat' ? require('@/assets/images/blackhat1.png') :
                                        selectedHat === 'salakot' ? require('@/assets/images/bambooHat.png') :
                                            selectedHat === 'cat' ? require('@/assets/images/cat.png') :
                                                null
                        }
                        style={[
                            styles.hatImage,
                            selectedHat === 'salakot' && { width: 230, height: 300, top: -90, left: 115 },
                            selectedHat === 'cat' && { width: 335, height: 300, top: 5, left: 65 },
                        ]}
                        resizeMode="contain"
                    />
                )}
            </Animated.View>

            {/* {showBubble && (
                <View style={styles.bubbleContainer}>
                    <View style={styles.bubble}>
                        <Text style={styles.bubbleText}>{bubbleText}</Text>
                    </View>
                </View>
            )} */}

            {/* -----------------------Statss ----------------------- */}

            <View style={styles.statsContainer}>
                <View style={styles.statRow}>
                    <View style={styles.knowledge}>
                        <ImageBackground source={require('@/assets/images/bulb.png')} style={styles.hatIcon}></ImageBackground>
                    </View>
                    <View style={styles.barBackground}>
                        <View style={[styles.barFill, { width: '80%' }]} />
                    </View>
                </View>

            </View>

            {/* ---------------------- ----------------------- */}


            <TouchableOpacity style={styles.bottomBar} onPress={toggleBottomPanel}>
                <Animated.View style={{ transform: [{ translateY: signJumpAnim }] }}>  { }
                    <ImageBackground
                        source={require('@/assets/images/asl.png')}
                        style={styles.SignImage}

                    />
                </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.leftBar} onPress={toggleLeftPanel}>
                <ImageBackground source={require('@/assets/images/settings.png')} style={styles.settingIcon}></ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rightBar} onPress={toggleRightPanel}>
                <ImageBackground source={require('@/assets/images/cosmetic.png')} style={styles.hatIcon}></ImageBackground>
            </TouchableOpacity>

            {(showBottomPanel || showRightPanel || showLeftPanel) && (
                <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closePanelsOnOverlayTap} />
            )}

            {showBottomPanel && (
                <Animated.View style={[styles.bottomPanel, { transform: [{ translateY: bottomSlideAnim }], backgroundColor: 'transparent' }]}>
                    <View style={styles.bottomContainer}>
                        <ImageBackground source={require('@/assets/images/book.png')} style={learningSection.container}>
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 60,
                                    left: 30,
                                    borderRadius: 10,
                                    width: 500,
                                    height: 200,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 20,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        gap: 10,
                                    }}
                                >
                                    <TouchableOpacity onPress={() => router.push('/lesson')} style={[learningSection.moduleCard, { backgroundColor: '#a3dd37ff' }]}>
                                        <View><Text style={styles.lessonText}>LESSON 1</Text><Image source={require('@/assets/images/check.png')} style={cosmeticsSection.lock} /></View>
                                    </TouchableOpacity>
                                    <View style={learningSection.moduleCard}><Text style={styles.lessonText}>LESSON 2</Text></View>
                                    <View style={learningSection.moduleCard}><Text style={styles.lessonText}>LESSON 3</Text> <Image source={require('@/assets/images/padlock.png')} style={cosmeticsSection.lock} /></View>


                                    <View style={learningSection.moduleCard}><Text style={styles.lessonText}>LESSON 4</Text> <Image source={require('@/assets/images/padlock.png')} style={cosmeticsSection.lock} /></View>
                                    <View style={learningSection.moduleCard}><Text style={styles.lessonText}>LESSON 5</Text> <Image source={require('@/assets/images/padlock.png')} style={cosmeticsSection.lock} /></View>
                                    <View style={learningSection.moduleCard}><Text style={styles.lessonText}>LESSON 6</Text> <Image source={require('@/assets/images/padlock.png')} style={cosmeticsSection.lock} /></View>
                                </View>
                            </View>
                        </ImageBackground>

                    </View>
                </Animated.View>
            )
            }

            {
                showRightPanel && (
                    <Animated.View style={[styles.rightPanel, { transform: [{ translateX: rightSlideAnim }] }]}>
                        <View style={styles.panelContainer}>

                            <ImageBackground source={require('@/assets/images/woodBG4.png')} style={cosmeticsSection.container}>
                                <Image
                                    source={require('@/assets/images/cosmeticSign1.png')}
                                    style={styles.cosmeticImage}
                                    resizeMode="contain"
                                />
                                <TouchableOpacity  // Changed to TouchableOpacity
                                    style={cosmeticsSection.itemCard}
                                    onPress={() => setSelectedHat('')}  // Set selected hat on press

                                ><Image source={require('@/assets/images/noHat.png')} style={[cosmeticsSection.image, { width: 65, height: 65, marginRight: 30, left: 15 }]} />
                                    <Text style={cosmeticsSection.itemText}>No Hat </Text>
                                </TouchableOpacity>

                                <TouchableOpacity  // Changed to TouchableOpacity
                                    style={cosmeticsSection.itemCard}
                                    onPress={() => setSelectedHat('cowboy')}  // Set selected hat on press
                                >
                                    <Image source={require('@/assets/images/cowboy1.png')} style={cosmeticsSection.image} />
                                    <Text style={cosmeticsSection.itemText}>Cowboy Hat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  // Changed to TouchableOpacity
                                    style={cosmeticsSection.itemCard}
                                    onPress={() => setSelectedHat('santa')}  // Set selected hat on press
                                >
                                    <Image source={require('@/assets/images/santa2.png')} style={cosmeticsSection.image} />
                                    <Text style={cosmeticsSection.itemText}>Santa Hat</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  // Changed to TouchableOpacity
                                    style={cosmeticsSection.itemCard}
                                    onPress={() => setSelectedHat('blackhat')}  // Set selected hat on press
                                >
                                    <Image source={require('@/assets/images/blackhat1.png')} style={cosmeticsSection.image} />
                                    <Text style={cosmeticsSection.itemText}>Black Hat</Text>
                                    <Image source={require('@/assets/images/new.png')} style={cosmeticsSection.lock} />
                                </TouchableOpacity>
                                <TouchableOpacity  // Changed to TouchableOpacity
                                    style={cosmeticsSection.itemCard}
                                    onPress={() => setSelectedHat('salakot')}  // Set selected hat on press
                                >
                                    <Image source={require('@/assets/images/bambooHat.png')} style={cosmeticsSection.image} />
                                    <Text style={cosmeticsSection.itemText}>Salakot</Text>
                                    <Image source={require('@/assets/images/new.png')} style={cosmeticsSection.lock} />
                                </TouchableOpacity>
                                <TouchableOpacity  // Changed to TouchableOpacity
                                    style={cosmeticsSection.itemCard}
                                    onPress={() => setSelectedHat('cat')}  // Set selected hat on press
                                >
                                    <Image source={require('@/assets/images/cat.png')} style={cosmeticsSection.image} />
                                    <Text style={cosmeticsSection.itemText}>Cat Mask</Text>
                                    <Image source={require('@/assets/images/new.png')} style={cosmeticsSection.lock} />
                                </TouchableOpacity>

                            </ImageBackground>

                        </View>
                    </Animated.View>
                )
            }

            {
                showLeftPanel && (
                    <Animated.View style={[styles.leftPanel, { transform: [{ translateX: leftSlideAnim }] }]}>
                        <View style={styles.leftPanelContainer}>
                            <Text style={styles.panelTitle}>Menu Settings</Text>

                            <TouchableOpacity style={styles.menuButton}><Text style={styles.menuText}>Pet Information</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.menuButton}><Text style={styles.menuText}>Preferences</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.menuButton}><Text style={styles.menuText}>Notifications</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.menuButton}><Text style={styles.menuText}>Learning Progress</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.menuButton}><Text style={styles.menuText}>Help Center</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.menuButton}><Text style={styles.menuText}>Feedback</Text></TouchableOpacity>

                            <TouchableOpacity style={styles.exitButton} onPress={() => setIsModalVisible(true)}>
                                <Text style={styles.exitText}>Exit</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                )
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Oh, you are leaving me? No, it’s fine... it’s not like I’m worth staying for </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => { setIsModalVisible(false); router.push('/'); }} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Abandon your pet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>STAY</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ImageBackground >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    petImage: { width: 360, height: 360, marginBottom: 10 },
    SignImage: { width: 460, height: 360, marginBottom: 110, left: -5 },
    hatIcon: { width: 60, height: 60, top: -2, },
    settingIcon: { width: 45, height: 45, top: -2, },
    cosmeticImage: { width: 230, height: 230, marginBottom: -60, left: -1, top: -20, },
    bubbleContainer: { position: 'absolute', top: '30%', left: '50%', transform: [{ translateX: -75 }, { translateY: -50 }], zIndex: 10 },
    bubble: { backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, elevation: 5 },
    bubbleText: { fontSize: 16, fontWeight: 'bold', color: '#333', textAlign: 'center' },
    statsContainer: { position: 'absolute', width: 400, height: 100, top: 65, left: 10, padding: 15, justifyContent: 'center' },
    statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, },
    statLabel: { fontSize: 16, fontWeight: 'bold', color: '#333', marginRight: 10, minWidth: 80 },
    barBackground: { flex: 1, height: 40, backgroundColor: '#290635ff', borderRadius: 10, borderBlockColor: '#000000ff', borderWidth: 5, overflow: 'hidden' },
    barFill: { height: '100%', backgroundColor: '#b14e86ff', borderRadius: 5 },
    knowledge: { left: 6, top: '0%', width: 100, height: 100, borderRadius: '100%', backgroundColor: '#b14e86ff', borderBlockColor: '#000000ff', borderWidth: 5, justifyContent: 'center', alignItems: 'center' },
    bottomBar: { position: 'absolute', width: '100%', bottom: 0, height: 150, alignItems: 'center', justifyContent: 'center' },
    leftBar: { position: 'absolute', left: 10, top: '25%', width: 90, height: 90, borderRadius: '100%', backgroundColor: '#005BBB', borderBlockColor: '#000000ff', borderWidth: 5, justifyContent: 'center', alignItems: 'center' },
    rightBar: { position: 'absolute', right: 10, top: '25%', width: 90, height: 90, borderRadius: '100%', backgroundColor: '#ffa600ff', borderBlockColor: '#000000ff', borderWidth: 5, justifyContent: 'center', alignItems: 'center' },
    barText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, },
    bottomPanel: { position: 'absolute', bottom: 50, left: 0, right: 0, height: 300, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    rightPanel: { position: 'absolute', right: 50, top: 0, bottom: 0, width: 300, backgroundColor: 'white', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 },
    leftPanel: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 300, backgroundColor: 'white', borderTopRightRadius: 20, borderBottomRightRadius: 20 },
    panelContainer: { flex: 1, width: 350, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#885607ff', },
    leftPanelContainer: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#042f5dff' },
    bottomContainer: { position: 'absolute', width: '100%', flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', bottom: 0, height: 240, backgroundColor: 'none' },
    panelTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: 'white' },
    bottomTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    exitButton: { borderColor: '#820805ff', borderWidth: 3, width: '100%', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
    exitText: { color: '#ffffffff', fontSize: 20, fontWeight: '600' },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' },
    modalText: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
    modalButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, width: '40%', alignItems: 'center' },
    modalButtonText: { color: 'white', fontWeight: 'bold' },
    menuButton: { width: '100%', backgroundColor: '#215287ff', borderColor: '#000000ff', borderWidth: 2, borderRadius: 10, paddingVertical: 14, marginVertical: 6, alignItems: 'center', justifyContent: 'center' },
    menuText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    lessonText: { color: '#000000', fontWeight: 'bold', textAlign: 'center', fontSize: 17, },
    hatImage: { position: 'absolute', width: 230, height: 230, top: -60, left: 120, marginLeft: -50, },

    link: { textDecorationLine: 'none', },
});

const learningSection = StyleSheet.create({
    container: { flexGrow: 1, flexDirection: 'row', width: 560, height: 370, padding: 50, borderRadius: 15, gap: 7, },
    page: { backgroundColor: '#9744445c', flexGrow: 1, flexDirection: 'row', width: 560, height: 370, padding: 50, borderRadius: 15, gap: 7, },
    moduleCard: { backgroundColor: '#f65a17ff', borderRadius: 10, padding: 5, width: '25%', height: '55%', justifyContent: 'center', borderBlockColor: '#000000ff', borderWidth: 3, alignItems: 'center' },
});

const cosmeticsSection = StyleSheet.create({
    container: { flex: 1, width: 350, height: 940, padding: 30, borderRadius: 15, gap: 10, top: -20, objectFit: 'contain' },
    itemCard: { backgroundColor: '#311207ae', borderRadius: 10, padding: 10, marginBottom: 10, height: 100, flexDirection: 'row', alignItems: 'center', gap: 10 },
    itemText: { fontSize: 16, fontWeight: 'bold', color: '#ffffffff' },
    image: { width: 100, height: 100, objectFit: 'contain' },
    lock: { width: 45, height: 45, top: -2, },
});

export default Dashboard;
