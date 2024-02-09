
export const dataVidIntro = {
    "videoname": "Default",
    "description": "This is a default video.",
    "videotype": "SINGLEITEM",
    "intro": {
      "image": "https://www.datavids.io/images/DataVids1.png",
      "title": "Want to turn your content into Viral Videos?",
      "tts": {
        "ttstext": "Want to turn your content into Viral Videos? ",
      }
    },
    "body": {
      "item": {
        "itemname": "Introducing DataVids",
        "itemsubtitle": "Turn Content Into Videos In Seconds",
        "itemdetails": "No coding or video editing!",
        "image": "https://www.datavids.io/images/DataVids1.png",
    },
    "outro": {
      "image": "https://www.datavids.io/images/screenshot1.jpg",
      "title": "This video was built in less than a minute!",
      "subtitle": "Visit DataVids.io to Learn More.",
      "tts": {
        "ttstext": "Even this video was built in less than a minute.  Visit DataVids dot IO to learn more.",
        "voice": "enUSMan1"
      },
    }
  }
}

const createAVideo = async () => {
    const valresponse = await fetch("/api/user/createvideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-token": "FD932FJF234DF9DFSKJFOIEFWEFC"
        },
        body: JSON.stringify({templateID:"A1325432V434232",videoDef:dataVidIntro})  //SPECIFY AN EXISTING VIDEO AND THE OVERRIDES
      });

}