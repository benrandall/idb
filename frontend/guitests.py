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
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/nav/div/ul/li[5]/div/div').is_displayed()

    def test_items_page(self):
        driver = self.driver
        driver.get("http://runescrape.lol/items")
        driver.implicitly_wait(10)
        assert driver.current_url.find("items") != -1
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div[2]/div[1]/a/div/div[1]').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div[4]/ul/li[4]/a').is_displayed()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div[2]/div[1]/a/div/div[1]').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("items/1")
        assert driver.find_element_by_xpath('//*[@id="item"]/div[1]/div/div/div[1]/img').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="item"]/div[1]/div/div/div[2]').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="item"]/div[2]').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="item"]/div[3]').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="item"]/div[4]').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="item"]/div[5]').is_displayed()

    def test_skills_page(self):
        driver = self.driver
        driver.get("http://runescrape.lol/skills")
        driver.implicitly_wait(10)
        assert driver.current_url.find("skills") != -1
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div[2]/div[1]/a/div/div[1]').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div[4]/ul/li[4]/a').is_displayed()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div[2]/div[1]/a/div/div[1]').click()
        driver.implicitly_wait(10)
        assert driver.current_url.find("skills/1")
        assert driver.find_element_by_xpath('//*[@id="skill"]/div[1]/div/div/div[1]/img').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="skill"]/div[1]/div/div/div[2]').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="skill"]/div[2]').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="skill"]/div[3]').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="skill"]/div[4]').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="skill"]/div[5]').is_displayed()

    def test_community_page(self):
        driver = self.driver
        driver.get("http://runescrape.lol/community")
        driver.find_element_by_xpath('//*[@id="root"]/div/div/nav/div/ul/li[3]/a').click()
        driver.implicitly_wait(10)
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/div[1]/div/div/a/button').click()
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
        driver.get("http://runescrape.lol")
        assert len(driver.find_elements_by_class_name('carousel-header-icon')) == 3
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div[1]/div/a').click()
        assert driver.current_url == 'http://runescrape.lol/items'
        driver.back()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/a[2]').click()
        driver.implicitly_wait(2)
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/a[1]').click()


    def test_about(self):
        driver = self.driver
        driver.get("http://runescrape.lol")
        driver.find_element_by_xpath('//*[@id="root"]/div/div/nav/div/ul/li[4]/a').click()
        driver.implicitly_wait(60)
        assert driver.current_url.find("about") != -1
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[1]/div/p/p').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/h4').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/h4/small').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/p[1]').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/p[2]/b').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/p[3]/b').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/p[4]/b').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[3]/div/p/div/div/p[1]/b').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[3]/div/p/div/div/p[2]/b').is_displayed()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[3]/div/p/div/div/p[3]/b').is_displayed()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[6]/div/p/div/div[1]/a').click()
        assert driver.current_url.find("report") != -1
        driver.back()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[6]/div/p/div/div[2]/a').click()
        assert driver.current_url.find("api") != -1
        driver.back()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[6]/div/p/div/div[3]/a').click()
        assert driver.current_url.find("idb") != -1

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()