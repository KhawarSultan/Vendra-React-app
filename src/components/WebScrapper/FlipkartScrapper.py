import requests
from bs4 import BeautifulSoup
url = 'https://www.ebay.com/itm/126013310065?_trkparms=pageci%3A85e85f59-6868-11ee-b57a-927f8491b1e7%7Cparentrq%3A201d243a18b0aab889094736ffffbd70%7Ciid%3A1'
def find_data(URL):
    headers = {"User-Agent": "Defined"}
    r = requests.get(URL, headers=headers)

    if r.status_code == 200:
        soup = BeautifulSoup(r.content, "html.parser")
        title_element = soup.find(class_='class="pdp-mod-product-badge-title"')
        # price_element = soup.find('div', class_='x-price-primary')
        # Refurbished_element = soup.find( class_='ux-icon-text__text')
        
        soup = BeautifulSoup(response.content, 'html.parser')
        print(soup.prettify());

        # if title_element:
        #     title_text = title_element.text.strip()
        #     print("Title:", title_text)
        # else:
        #     print("Title element with class 'B_NuCI' not found on the page.")

        # if Refurbished_element:
        #     Refurbished_text = Refurbished_element.text.strip()
        #     print("Refurbished_text:", Refurbished_text)
        # else:
        #     print("Title element with class 'B_NuCI' not found on the page.")

        # if price_element:
        #     price_text = price_element.text.strip()
        #     print("Price:", price_text)
        # else:
        #     print("Price element with class '_30jeq3 _16Jk6d' not found on the page.")
    else:
        print("Failed to retrieve the page. Status code:", r.status_code)

find_data(url)
