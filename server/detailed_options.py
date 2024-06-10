from langchain_google_genai import ChatGoogleGenerativeAI
import os
from scrape_serp import *
from initial_itinerary import *
import time


def individual_places():
    options_dict, optionChosen = developOptions()

    chosenDetails = options_dict[int(optionChosen)]

    itinerary = "***************\n"

    for place_dur in chosenDetails:
        dur = place_dur[1]
        loc = place_dur[0]

        print("Creating itinerary for: \n")
        print(dur + " in " + loc + "\n")

        itinerary += "Details for " + str(dur) + " days in " + str(loc) + "\n"

        itinerary += summarize_content(loc, dur)
        itinerary += "\n***************"
    
    file = open("Itinerary.txt", "w")

    file.write(itinerary)

    file.close()



def summarize_content(loc, dur):
    #gathering general trip info from top 5 reddits/blogs: CHANGE NUMBER!!!

    redditContent, blogContent = scrapeRedditAndBlogs(loc, dur)

    redditSummaries = ""

    for r in redditContent:
        redditSummaries += summarizeText(r, " \n summarize this") #tell llm to summarize the content, add to a huge string
        redditSummaries += "\n \n \n \n ******** \n \n \n \n"

    blogSummaries = ""

    for b in blogContent:
        blogSummaries += summarizeText(b, " \n summarize this") #tell llm to summarize the content, add to a huge string
        blogSummaries += "\n \n \n \n ******** \n \n \n \n"

    finalRSummary = summarizeText(redditSummaries, " \n consolidate all information and keep it detailed")
    finalBSummary = summarizeText(blogSummaries, " \n consolidate all information and keep it detailed")


    finalSummary = summarizeText(finalRSummary+finalBSummary, 
    
    """ \n combine these in the following format for """ + dur + " days in " + loc + """:
        bulleted list of all places to visit, bulleted list of all restaurant options, bulleted list of all tips to keep in mind,
        best mode of transporation for this place
    """)
    
    print('reddit: \n')
    print(finalRSummary)
    print('blog: \n')
    print(finalBSummary)

    return finalSummary

    # file = open("Itinerary.txt", "w")

    # file.write(finalSummary)

    # file.close()
    

def summarizeText(text, addition):
    prompt = text + addition

    os.environ['GOOGLE_API_KEY'] = "AIzaSyDAihy560sOWWZAtWvO2lVzNSegMvBHf2w" #environ var

    llm = ChatGoogleGenerativeAI(model='gemini-pro', temperature=0.9)

    response = llm.invoke(prompt)

    return response.content



individual_places()

    
    




