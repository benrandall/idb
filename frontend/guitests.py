import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_homepage(self):
        driver = self.driver
        driver.get("http://dev.runescrape.lol/#/")
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/a[2]').click()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/a[1]').click()
        self.waitForPageLoad('//*[@id="root"]/div/div/nav/div/ul/li[1]/a')
        driver.find_element_by_xpath('//*[@id="root"]/div/div/nav/div/ul/li[1]/a').click()
        assert driver.current_url == 'http://dev.runescrape.lol/#/items'
        driver.back()
        self.waitForPageLoad('//*[@id="root"]/div/div/nav/div/ul/li[2]/a')
        driver.find_element_by_xpath('//*[@id="root"]/div/div/nav/div/ul/li[2]/a').click()
        assert driver.current_url == 'http://dev.runescrape.lol/#/skills'
        driver.back()
        self.waitForPageLoad('//*[@id="root"]/div/div/nav/div/ul/li[3]/a')
        driver.find_element_by_xpath('//*[@id="root"]/div/div/nav/div/ul/li[3]/a').click()
        assert driver.current_url == 'http://dev.runescrape.lol/#/community'
        driver.back()
        self.waitForPageLoad('//*[@id="root"]/div/div/nav/div/ul/li[4]/a')
        driver.find_element_by_xpath('//*[@id="root"]/div/div/nav/div/ul/li[4]/a').click()
        assert driver.current_url == 'http://dev.runescrape.lol/#/about'
        driver.back()

    def test_items_page(self):
        driver = self.driver
        driver.get("http://dev.runescrape.lol/#/items")
        driver.implicitly_wait(10)
        driver.find_element_by_class_name('card').click()
        assert driver.current_url.find("items") != -1
        driver.find_element_by_class_name('icon')
        driver.find_element_by_class_name('medium-title')
        driver.find_element_by_class_name('small-title')
        driver.find_elements_by_class_name('card')
        driver.find_element_by_xpath('//*[@id="item"]/div[3]/div/a/div/div[2]/h5').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("skills") != -1
        driver.back()
        driver.find_element_by_xpath('//*[@id="item"]/div[5]/div[1]/div/div/a/button').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("reddit") != -1
        driver.back()
        driver.find_element_by_xpath('//*[@id="item"]/div[5]/div[2]/div/div/a/button').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("community") != -1
        driver.back()

    def test_skills_page(self):
        driver = self.driver
        driver.get("http://dev.runescrape.lol/#/skills")
        driver.implicitly_wait(10)
        driver.find_element_by_class_name('card').click()
        assert driver.current_url.find("skills") != -1
        driver.find_element_by_class_name('medium-title')
        driver.find_element_by_class_name('small-title')
        driver.find_elements_by_class_name('card')
        driver.find_element_by_xpath('//*[@id="skill"]/div[3]/div/a/div/div[1]').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("items") != -1
        driver.back()
        driver.find_element_by_xpath('//*[@id="skill"]/div[5]/div[1]/div/div/a/button').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("reddit") != -1
        driver.back()
        driver.find_element_by_xpath('//*[@id="skill"]/div[5]/div[2]/div/div/a/button').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("community") != -1
        driver.back()

    def test_community_page(self):
        driver = self.driver
        driver.get("http://dev.runescrape.lol/#/community")
        driver.implicitly_wait(10)
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div[1]/div/div/a/button').click()
        assert driver.current_url.find("community") != -1
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[1]/div/div/iframe')
        driver.find_elements_by_class_name('card-img-top-custom')
        driver.find_elements_by_class_name('card')
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div[2]/a/div').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("items") != -1
        driver.back()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[3]/div[2]/a/div').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("skills") != -1

    def test_carousel(self):
        driver = self.driver
        driver.get("http://dev.runescrape.lol/#/")
        self.waitForPageLoad('//*[@id="root"]/div/div/div/div/div[1]/div/a')
        self.carouselClick('//*[@id="root"]/div/div/div/div/div[1]/div/a')
        assert driver.current_url == 'http://dev.runescrape.lol/#/items'
        driver.get("http://dev.runescrape.lol/#/")
        self.waitForPageLoad('//*[@id="root"]/div/div/div/div/div[2]/div/a')
        self.carouselClick('//*[@id="root"]/div/div/div/div/div[2]/div/a')
        assert driver.current_url == 'http://dev.runescrape.lol/#/skills'
        driver.get("http://dev.runescrape.lol/#/")
        self.waitForPageLoad('//*[@id="root"]/div/div/div/div/div[3]/div/a')
        self.carouselClick('//*[@id="root"]/div/div/div/div/div[3]/div/a')
        assert driver.current_url == 'http://dev.runescrape.lol/#/community'

    def carouselClick(self, xpath):
        driver = self.driver
        element = driver.find_element_by_xpath(xpath)
        next_button = driver.find_element_by_xpath('//*[@id="root"]/div/div/div/a[2]')
        while element.is_displayed() == 0:
            next_button.click()
            driver.implicitly_wait(1)
        element.click()

    def waitForPageLoad(self, xpath):
        element_present = EC.presence_of_element_located((By.XPATH, xpath))
        WebDriverWait(self.driver, 10, .25).until(element_present)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()