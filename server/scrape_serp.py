from serpapi import GoogleSearch
import requests
from bs4 import BeautifulSoup
import csv
import praw

#function to scrape top 20 reddit results 
#and top 20 blogs for a trip to country x for y days

def scrapeInitial(loc, dur):
    #print('i want to go to: ')
    #loc = input()
    #print('i want to go for these many days: ')
    #dur = input()

    print (loc)
    print(str(dur))

    initEarthLinks = scrapeSERPInitial(loc, dur, "earthtrekkers")
    initKimLinks = scrapeSERPInitial(loc, dur, "kimkim")

    etContent = []

    for link in initEarthLinks:
        etContent.append(scrapeBlog(link))

    kimContent = []

    for link in initKimLinks:
        kimContent.append(scrapeBlog(link))

    #scraped the initial links

    initItineraryContent = etContent + kimContent #consolidate info

    print(initItineraryContent)
    return initItineraryContent

def scrapeRedditAndBlogs(loc, dur):
    blogLinks, redditLinks = scrapeSERP(loc, dur) #call link scraper, save into blog and reddit links

    redditContent = []

    for rLink in redditLinks:
        redditContent.append(scrapeReddit(rLink)) #add reddit content to list

    blogContent = []

    for bLink in blogLinks:
        blogContent.append(scrapeBlog(bLink)) #add blog content to list

    return redditContent, blogContent





#function to get the initial links

def scrapeSERPInitial(loc, dur, site_name):

    query = str(dur) + "days in " + loc + " " + site_name

    params = {
        "q": query,
        "hl": "en",
        "gl": "us",
        "google_domain": "google.com",
        "api_key": "ff47743bcea8483c61a2f37649a3ae151a217c128419438a1646fbe66031a5e9",
        "num": 6
    }

    search = GoogleSearch(params)
    results = search.get_dict()['organic_results']

    initialLinks = []

    for r in results:
        initialLinks.append(r['link'])

    return initialLinks


def scrapeSERP(loc, dur):

    query = "what to do in " + loc + "for " + dur + "days blogs?"

    params = {
        "q": query,
        "hl": "en",
        "gl": "us",
        "google_domain": "google.com",
        "api_key": "ff47743bcea8483c61a2f37649a3ae151a217c128419438a1646fbe66031a5e9",
        "num": 5
    }

    search = GoogleSearch(params)
    results = search.get_dict()['organic_results']

    blogLinks = []

    for r in results:
        blogLinks.append(r['link'])

    query = "what to do in " + loc + "for " + dur + "days reddit?"

    params = {
        "q": query,
        "hl": "en",
        "gl": "us",
        "google_domain": "google.com",
        "api_key": "ff47743bcea8483c61a2f37649a3ae151a217c128419438a1646fbe66031a5e9",
        "num": 5
    }

    search = GoogleSearch(params)
    results = search.get_dict()['organic_results']

    redditLinks = []

    for r in results:
        redditLinks.append(r['link'])

    return blogLinks, redditLinks




#reddit scraping praw library to scrape the text from a reddit site


def scrapeReddit(link):

    reddit = praw.Reddit(
        client_id = "VxmaNeTmgzmp8dUA2ttN2A",
        client_secret = "LULEusDdIdJS09FBpSMviarzvuQo2A",
        user_agent = "Mobile-Ad6205"
    )

    sub = reddit.submission(url=link)
    sub.comments.replace_more(limit=None)
    comments = sub.comments.list()

    content = sub.selftext + "\n"

    for comment in comments:
        content += comment.body + "\n"

    with open('siteData', 'w', encoding='utf-8') as file:
        file.write(content)

    return content


#basic bs4 scraping to scrape text from blog 


def scrapeBlog(link):
    # try:
    page = requests.get(link)
    soup = BeautifulSoup(page.content, 'html.parser')

    tags = soup.find_all('p')

    content = ""

    for tag in tags:
        content += tag.get_text()

    return content
    # except ConnectionError:
    #     print("err with {link}, skipping it")
    # except requests.HTTPError:
    #     print("err with {link}, skipping it")
    # except Exception:
    #     print("err with {link}, skipping it")
    # return ""
