# import pathlib
# import textwrap
# import google.generativeai as genai
# from IPython.display import display
# from IPython.display import Markdown

from langchain_google_genai import ChatGoogleGenerativeAI
import os
from scrape_serp import *
import time

# def summarizeGeneral():

#     #gathering general trip info from top 10 reddits/blogs

#     redditContent, blogContent = scrapeRedditAndBlogs()

#     redditSummaries = ""

#     for r in redditContent:
#         redditSummaries += summarizeText(r, " \n summarize this") #tell llm to summarize the content, add to a huge string
#         redditSummaries += "\n \n \n \n ******** \n \n \n \n"

#     blogSummaries = ""

#     for b in blogContent:
#         blogSummaries += summarizeText(b, " \n summarize this") #tell llm to summarize the content, add to a huge string
#         blogSummaries += "\n \n \n \n ******** \n \n \n \n"


#     finalRSummary = summarizeText(redditSummaries, " \n consolidate this into a holistic information guide")
#     finalBSummary = summarizeText(blogSummaries, " \n consolidate this into a holistic information guide")
    
#     print('reddit: \n')
#     print(redditSummaries)
#     print('blog: \n')
#     print(blogSummaries)


# def summarizeText(text, addition):
#     prompt = text + addition

#     os.environ['GOOGLE_API_KEY'] = "AIzaSyDAihy560sOWWZAtWvO2lVzNSegMvBHf2w" #environ var

#     llm = ChatGoogleGenerativeAI(model='gemini-pro', temperature=0.9)

#     response = llm.invoke(prompt)

#     return response.content


# summarizeGeneral()

def developOptions():
    initialContent, loc, dur = scrapeInitial()

    #iteratively add to a summary string (adding 1 source info at a time)

    itineraryContent = ""

    os.environ['GOOGLE_API_KEY'] = "AIzaSyDAihy560sOWWZAtWvO2lVzNSegMvBHf2w" #environ var
    llm = ChatGoogleGenerativeAI(model='gemini-pro', temperature=0.2)


    for content in initialContent:

        #split into smaller pieces (of 20000 chars to be safe) if required

        linkContent = content

        if (len(content) > 20000):
            #need to split
            linkContent = "" #init to blank
            for i in range(0, len(content), 20000):
                #edited below end to account for the last case
                end = 20000 if len(content) - i > 20000 else (len(content) - i)

                splitContent = content[i:i+end]

                prompt = splitContent + " \n summarize this content"
                response = llm.invoke(prompt)

                linkContent += response.content

                time.sleep(2) #2 requests per second limit?
                
                #add summary of pieces to create whole link summary as orig content too large

        #call llm on link content now: the link with large contents have been summarized


        prompt = linkContent + " \n summarize the places and days required per place from this information"

        print("\nconsolidating...")

        #summarize sources, add summary to string

        response = llm.invoke(prompt)
        
        itineraryContent += response.content

        #final content will be response of final query

    finalPrompt = itineraryContent + """ 
    \n \n use this information to create """ + dur + """ day itinerary options within """ + loc + """with places and respective days required there \n\n

    Format each option as such, changing the hashtags to numbers as required and adding as many lines per option as required: \n
    *** \n
    Option #: \n
    City name, # days \n
    City name, # days \n
    *** \n

    """

    print("\nalmost there...")

    response = llm.invoke(finalPrompt)

    itineraryOptions = response.content

    print(itineraryOptions)

    options_dict = saveOptions(itineraryOptions)

    print("\n\nChoose an option that excites you!\nYou will be able to customizer the specifics of it later!\n\n\n")

    optionChosen = input()

    print("Nice, option " + optionChosen + " chosen.\n")

    # print(options_dict)

    return options_dict, optionChosen





def saveOptions(options):

    splitOptions = options.split("***") #split based on the stars

    optionsSaved = {}

    for option in splitOptions:

        lines = option.strip().split('\n')

        if len(lines) > 1:
        # Extract the option number
            option_header = lines[0].strip()
            option_number = int(option_header.split()[1].strip(':'))
            
            # Extract the place and duration tuples
            places_durations = []
            for line in lines[1:]:
                place_duration = line.split(',')
                if len(place_duration) == 2:
                    place = place_duration[0].strip()
                    duration = place_duration[1].strip()
                    places_durations.append((place, duration))
            
            # Add the option to the dictionary
            optionsSaved[option_number] = places_durations

    return optionsSaved

