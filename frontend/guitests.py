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