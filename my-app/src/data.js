import moodWebApp from './portfolio/moodWebApp.png'
import metricLearn from './portfolio/metricLearnHome.png'
import mitreHome from './portfolio/mitreHome.png'
import musicBuddy from './portfolio/musicBuddyHome.png'
import userLoginPage from './portfolio/userLoginHome.png'
import plaHome from './portfolio/plaHome.png'
const projects = [
    {
        name: "Mood Web App",
        description: "The goal of this project was to create a RESTful web application with a /mood endpoint that allows logged in users" +
                     "to post about how they feel and see all previous posts from that user. The users must add a title and body to each post," +
                      "then the current date and time will be added as fields, along with a streak field which keeps track of how many days in" + 
                      "a row this user has posted a mood status.",
        image: moodWebApp,
        link: 'http://skopec.pythonanywhere.com',
        id: 1
    },
    {
        name: "Django Music Player",
        description: "The goal of this project was to create an all in one social media and music web application." + 
                     "This was achieved by using the Django Framework and Spotifty python API. This web app allowed for" + 
                    "music playback, playlist creation, and user interaction through profile and song comments." ,
        image: musicBuddy,
        link: 'https://github.com/kopecs48/DjangoSpotify',
        id : 2
    },
    {
        name: "Metric Learn Data Visualization",
        description: "Metric Learn is a libray from SKLearn that can be very powerful. Capable of creating metrics able to filter out the noise in data, inorder to help give more" +
                      "accurate classifacations accomplished with machine learning methods",
                     
        image: metricLearn,
        link: 'https://github.com/kopecs48/Metric-Learn-Data-Visualization',
        id : 3
    },
    {
        name: "User Login and Registration",
        description: "An introduction to user registration and authentication accomplished with AWS Amplify and Cognito. Capable of displaying the current logged in user," +
                      "initialize user into user pool after an automated verifaction link.",
                     
        image: userLoginPage,
        link: 'https://github.com/kopecs48/user-registration-login',
        id : 4
    },
    {
        name: "Perceptron Learning Algorithm",
        description: "The Perceptron is an algorithm for supervised learning of binary classifiers.A binary classifier is a function which can decide whether or not an input," +
                      "represented by a vector of numbers, belongs to some specific class.",
                     
        image: plaHome,
        link: 'https://github.com/kopecs48/PerceptronLearningAlgorithm',
        id : 5
    },
    {
        name: "MITRE ATT&CK Data Threat Analyzer",
        description: "MITRE ATT&CK is a globally-accessible knowlege base of adversary tactices and techniques. Given data in the form of JSONs my goal was to parse the data, create an editable" +
                      "table, and generate a modifiable pdf.",
                     
        image: mitreHome,
        link: '#',
        id : 6
    },
]

export {projects}
