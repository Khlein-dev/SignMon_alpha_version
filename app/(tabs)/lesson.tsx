import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';

// Lessons with images
const lessons = [
    {
        id: 1,
        content: (
            <Text>
                Learn the sign for <Text style={{ fontWeight: 'bold' }}>Hello</Text>. Raise your hand near your forehead and move it outward, like a wave.
            </Text>
        ),
        image: require('@/assets/images/hello.jpg')
    },
    {
        id: 2,
        content: (
            <Text>
                Learn the sign for <Text style={{ fontWeight: 'bold' }}>Thank you</Text>. Place your fingertips on your chin and move your hand forward.
            </Text>
        ),
        image: require('@/assets/images/thankyou.jpg')
    },
    {
        id: 3,
        content: (
            <Text>
                Learn the sign for <Text style={{ fontWeight: 'bold' }}>You are welcome</Text>. Move your hand from your chin forward in a small arc, as if bringing kindness outward.
            </Text>
        ),
        image: require('@/assets/images/youarewelcome.jpg')
    },
    {
        id: 4,
        content: (
            <Text>
                Learn the sign for <Text style={{ fontWeight: 'bold' }}>Goodbye</Text>. Open and close your hand in a waving motion.
            </Text>
        ),
        image: require('@/assets/images/goodbye.jpg')
    },
    {
        id: 5,
        content: (
            <Text>
                Learn the sign for <Text style={{ fontWeight: 'bold' }}>I love you</Text>. Extend your thumb, index finger, and pinky finger while keeping your middle and ring fingers down.
            </Text>
        ),
        image: require('@/assets/images/iloveyou.png')
    },
];

// Quiz questions
const quizQuestions = [
    { id: 1, question: 'What is she trying to say?', options: ['See you', 'Hello', 'Goodbye'], correct: 'Hello', image: require('@/assets/images/hello.jpg') },
    { id: 2, question: 'What is she trying to say?', options: ['Thank you!', 'You are welcome', 'I love you'], correct: 'Thank you!', image: require('@/assets/images/thankyou.jpg') },
    { id: 3, question: 'What is she trying to say?', options: ['peace be with you', 'Rock and Roll!', 'I love you'], correct: 'I love you', image: require('@/assets/images/iloveyou.png') },
    { id: 4, question: 'What is she trying to say?', options: ['You are welcome!', 'Give me money', 'Stop'], correct: 'You are welcome!', image: require('@/assets/images/youarewelcome.jpg') },
    { id: 5, question: 'What is she trying to say?', options: ['Closed your fist', 'Goodbye', 'I love you'], correct: 'Goodbye', image: require('@/assets/images/goodbye.jpg') },
];

const SignLanguageLesson = () => {
    const router = useRouter();
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [isQuizActive, setIsQuizActive] = useState(false);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizScore, setQuizScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [showResults, setShowResults] = useState(false);

    const handleNextLesson = () => {
        if (currentLessonIndex < lessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
        } else {
            setIsQuizActive(true);
            setCurrentQuizIndex(0);
            setUserAnswers([]);
            setFeedback('');
            setShowResults(false);
            setQuizScore(0);
        }
    };

    const handlePreviousLesson = () => {
        if (currentLessonIndex > 0) setCurrentLessonIndex(currentLessonIndex - 1);
    };

    const handleAnswerSelection = (selectedOption, correctAnswer) => {
        const isCorrect = selectedOption === correctAnswer;
        const updatedAnswers = [...userAnswers, selectedOption];
        const updatedScore = isCorrect ? quizScore + 1 : quizScore;

        setFeedback(isCorrect ? 'Correct!' : 'Incorrect');
        setUserAnswers(updatedAnswers);
        setQuizScore(updatedScore);

        setTimeout(() => {
            setFeedback('');
            if (currentQuizIndex < quizQuestions.length - 1) {
                setCurrentQuizIndex(currentQuizIndex + 1);
            } else {
                setShowResults(true);
            }
        }, 1200);
    };

    const handleRetakeQuiz = () => {
        setCurrentQuizIndex(0);
        setUserAnswers([]);
        setQuizScore(0);
        setFeedback('');
        setShowResults(false);
    };

    const handleRestartLessons = () => {
        setIsQuizActive(false);
        setCurrentLessonIndex(0);
        setUserAnswers([]);
        setQuizScore(0);
        setShowResults(false);
        setFeedback('');
    };

    return (
        <ImageBackground source={require('@/assets/images/woodBG4.png')} style={styles.container}>
            <ImageBackground source={require('@/assets/images/nn.png')} style={styles.lessonBox}>
                {!isQuizActive ? (
                    <>
                        <Text style={styles.title}>Lesson 1: Basic Phrases</Text>
                        <Text style={styles.progressText}>Part {currentLessonIndex + 1} of {lessons.length}</Text>
                        <Text style={styles.lessonContent}>{lessons[currentLessonIndex].content}</Text>

                        {/* Lesson Image */}
                        <View style={{ alignItems: 'center' }}>
                            <Image source={lessons[currentLessonIndex].image} style={styles.lessonImage} resizeMode="contain" />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handlePreviousLesson} disabled={currentLessonIndex === 0}>
                                <Text style={[styles.button, currentLessonIndex === 0 && styles.disabledButton]}>Previous</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleNextLesson}>
                                <Text style={styles.button}>
                                    {currentLessonIndex === lessons.length - 1 ? 'Start Quiz' : 'Next'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        {!showResults ? (
                            <View style={styles.quizContainer}>
                                <Text style={styles.progressText}>Question {currentQuizIndex + 1} of {quizQuestions.length}</Text>
                                <Text style={styles.quizQuestion}>{quizQuestions[currentQuizIndex].question}</Text>

                                <View style={{ alignItems: 'center' }}>
                                    <Image source={quizQuestions[currentQuizIndex].image} style={styles.quizImage} resizeMode="contain" />
                                </View>

                                {quizQuestions[currentQuizIndex].options.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleAnswerSelection(option, quizQuestions[currentQuizIndex].correct)}
                                        style={styles.optionButton}
                                    >
                                        <Text style={styles.optionText}>{option}</Text>
                                    </TouchableOpacity>
                                ))}

                                {feedback && <Text style={styles.feedbackText}>{feedback}</Text>}
                            </View>
                        ) : (
                            <View style={styles.resultContainer}>
                                <Text style={styles.resultText}>
                                    Quiz Completed! Your score: {quizScore} / {quizQuestions.length}
                                </Text>

                                {quizScore >= Math.ceil(quizQuestions.length * 0.7) ? (
                                    <>
                                        <Text style={styles.resultSubText}>Congratulations! You passed.</Text>
                                        <View style={{ marginTop: 30, alignItems: 'center', }}>
                                            <Text style={styles.resultText}>
                                                <Image source={require('@/assets/images/check.png')} style={{ width: 30, height: 30 }} />+20 Knowledge
                                            </Text>
                                            <Text style={styles.resultText}>
                                                <Image source={require('@/assets/images/check.png')} style={{ width: 30, height: 30 }} />You have unlocked LESSON 2!
                                            </Text>
                                            <Text style={styles.resultText}>
                                                <Image source={require('@/assets/images/check.png')} style={{ width: 30, height: 30 }} />New cosmetics unlocked!
                                            </Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '60%' }}>
                                                <Image source={require('@/assets/images/blackhat1.png')} style={{ width: 100, height: 100, marginTop: 10, objectFit: 'contain' }} />
                                                <Image source={require('@/assets/images/bambooHat.png')} style={{ width: 100, height: 100, marginTop: 10, objectFit: 'contain' }} />
                                                <Image source={require('@/assets/images/cat.png')} style={{ width: 100, height: 100, marginTop: 10, objectFit: 'contain' }} />
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => router.push('/passed')} style={styles.resultButton}>
                                            <Text style={styles.buttonText}>Go to you pet!</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.resultSubText}>You didn’t pass. Try reviewing again.</Text>
                                        <View style={styles.retryButtons}>
                                            <TouchableOpacity onPress={handleRetakeQuiz} style={styles.resultButton}>
                                                <Text style={styles.buttonText}>Retake Quiz</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={handleRestartLessons} style={[styles.resultButton, { backgroundColor: '#398febff' }]}>
                                                <Text style={styles.buttonText}>Review Lessons</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                            </View>
                        )}
                    </>
                )}

            </ImageBackground>
            {/* Show the "Return to Dashboard" button only if the quiz is not passed */}
            {!(isQuizActive && showResults && quizScore >= Math.ceil(quizQuestions.length * 0.7)) && (
                <TouchableOpacity onPress={() => router.push('/dashboard')} style={styles.dashboardButton}>
                    <Text style={styles.dashboardButtonText}>Return to Dashboard</Text>
                </TouchableOpacity>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    lessonBox: { position: 'absolute', height: 600, width: 400, padding: 35 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
    progressText: { fontSize: 16, color: '#000', marginBottom: 10 },
    lessonContent: { fontSize: 22, textAlign: 'center', marginBottom: 15, lineHeight: 35 },
    lessonImage: { width: 190, height: 200, marginBottom: 10, borderRadius: 10, borderColor: 'black', borderWidth: 3 },
    quizImage: { width: 190, height: 200, marginBottom: 10, borderRadius: 10, borderColor: 'black', borderWidth: 3 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 },
    button: { padding: 10, backgroundColor: '#ff9100ff', color: 'black', borderRadius: 5, borderWidth: 3, borderColor: 'black', width: 100, height: 50, textAlign: 'center', textAlignVertical: 'center', fontWeight: 'bold' },
    disabledButton: { display: 'none' },
    quizContainer: { width: '100%' },
    quizQuestion: { fontSize: 25, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    optionButton: { padding: 10, backgroundColor: '#ff9e20ff', marginVertical: 5, borderRadius: 5, borderWidth: 2, borderColor: 'black' },
    optionText: { fontSize: 16, textAlign: 'center' },
    feedbackText: { fontSize: 16, color: 'black', marginTop: 10, textAlign: 'center' },
    resultContainer: { alignItems: 'center', width: '100%' },
    resultText: { fontSize: 20, marginBottom: 10 },
    resultSubText: { fontSize: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
    resultButton: { padding: 10, backgroundColor: '#9ae92bff', borderRadius: 5, marginTop: 10, width: '80%', alignItems: 'center', borderColor: 'black', borderWidth: 3 },
    buttonText: { color: 'black', fontSize: 16, fontWeight: 'bold' },
    retryButtons: { marginTop: 10, width: '100%', alignItems: 'center' },


    dashboardButton: {
        position: 'absolute',
        bottom: 80,
        marginTop: 20,
        backgroundColor: '#ffd700',
        padding: 10,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: 'black',
        alignItems: 'center'
    },
    dashboardButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
});

export default SignLanguageLesson;
