import unittest
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys

class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_homepage(self):
        driver = self.driver
        driver.get("http://dev.runescrape.lol/#/")
        try:
            driver.find_element_by_class_name("carousel-fullscreen carousel slide")
        except NoSuchElementException:
            return False
        return True


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()