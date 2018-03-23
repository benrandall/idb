import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By


class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_homepage(self):
        driver = self.driver
        driver.get("http://runescrape.lol")
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/a[2]').click()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/a[1]').click()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div')

    def test_items_page(self):
        driver = self.driver
        driver.get("http://runescrape.lol")
        driver.find_element_by_xpath('//*[@id="root"]/div/div/nav/div/ul/li[1]/a').click()
        driver.implicitly_wait(60)
        driver.find_element_by_class_name('card').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("items") != -1
        driver.find_element_by_class_name('icon')
        driver.find_element_by_class_name('medium-title')
        driver.find_element_by_class_name('small-title')
        driver.find_elements_by_class_name('card')
        driver.find_element_by_xpath('//*[@id="item"]/div[3]/div/a/div/div[2]/h5').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("skills") != -1
        driver.back()
        driver.implicitly_wait(10)
        driver.find_element_by_xpath('//*[@id="item"]/div[5]/div[1]/div/div/a/button').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("reddit") != -1
        driver.back()
        driver.implicitly_wait(10)
        driver.find_element_by_xpath('//*[@id="item"]/div[5]/div[2]/div/div/a/button').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("community") != -1
        driver.back()

    def test_skills_page(self):
        driver = self.driver
        driver.get("http://runescrape.lol")
        driver.find_element_by_xpath('//*[@id="root"]/div/div/nav/div/ul/li[2]/a').click()
        driver.implicitly_wait(60)
        driver.find_element_by_class_name('card').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("skills") != -1
        driver.find_element_by_class_name('medium-title')
        driver.find_element_by_class_name('small-title')
        driver.find_elements_by_class_name('card')
        driver.find_element_by_xpath('//*[@id="skill"]/div[3]/div/a/div/div[1]').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("items") != -1
        driver.back()
        driver.implicitly_wait(10)
        driver.find_element_by_xpath('//*[@id="skill"]/div[5]/div[1]/div/div/a/button').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("reddit") != -1
        driver.back()
        driver.implicitly_wait(10)
        driver.find_element_by_xpath('//*[@id="skill"]/div[5]/div[2]/div/div/a/button').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("community") != -1
        driver.back()

    def test_community_page(self):
        driver = self.driver
        driver.get("http://runescrape.lol")
        driver.find_element_by_xpath('//*[@id="root"]/div/div/nav/div/ul/li[3]/a').click()
        driver.implicitly_wait(40)
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div[1]/div/div/a/button').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("community") != -1
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[1]/div/div/iframe')
        driver.find_elements_by_class_name('card-img-top-custom')
        driver.find_elements_by_class_name('card')
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div[2]/a/div').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("items") != -1
        driver.back()
        driver.implicitly_wait(10)
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[3]/div[2]/a/div').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("skills") != -1

    def test_carousel(self):
        driver = self.driver
        driver.get("http://runescrape.lol/items/#/")
        assert len(driver.find_elements_by_class_name('carousel-header-icon')) == 3
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div[1]/div/a').click()
        assert driver.current_url == 'http://runescrape.lol/items/#/items'
        driver.back()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/a[2]').click()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/a[1]').click()

    def test_about(self):
        driver = self.driver
        driver.get("http://runescrape.lol")
        driver.find_element_by_xpath('//*[@id="root"]/div/div/nav/div/ul/li[4]/a').click()
        driver.implicitly_wait(60)
        assert driver.current_url.find("about") != -1
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[1]/div/p/p').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/h4/text()').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/h4/small').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/p[1]/text()').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/p[2]/b').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/p[3]/b').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/p[4]/b').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[3]/div/p/div/div/p[1]/b').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[3]/div/p/div/div/p[2]/b').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[3]/div/p/div/div/p[3]/b').is_displayed()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[6]/div/p/div/div[1]/a').click()
        assert driver.current_url.find("report") != -1
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[6]/div/p/div/div[2]/a').click()
        assert driver.current_url.find("api") != -1
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[6]/div/p/div/div[3]/a').click()
        assert driver.current_url.find("idb") != -1

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()