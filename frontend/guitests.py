import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By


class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_homepage(self):
        driver = self.driver
        driver.get("http://runescrape.lol")
        driver.find_element_by_class_name('carousel-control-next').click()
        driver.find_element_by_class_name('carousel-control-prev').click()
        assert driver.find_element_by_class_name('carousel-fullscreen').is_displayed()
        assert driver.find_element_by_class_name('react-search-bar__field').is_displayed()

    def test_items_page(self):
        self.items_and_skills_test("item")

    def test_skills_page(self):
        self.items_and_skills_test("skill")

    def test_community_page(self):
        driver = self.driver
        driver.get("http://runescrape.lol/community")
        self.wait()
        driver.find_element_by_xpath('//a[@href="/community/1"]').click()
        self.wait()
        assert driver.current_url.find("community") != -1
        driver.find_element_by_class_name('embed-responsive-item')
        driver.find_element_by_class_name('card-img-top-custom')
        driver.find_element_by_class_name('card').click()
        self.wait()
        assert driver.current_url.find("items") != -1
        driver.back()
        self.wait()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[3]/div[2]/a/div').click()
        self.wait()
        assert driver.current_url.find("skills") != -1

    def test_carousel(self):
        driver = self.driver
        driver.get("http://runescrape.lol")
        assert len(driver.find_elements_by_xpath('//*[@id="root"]/div/div/div/div/div[*]')) == 3
        driver.find_element_by_class_name('centered-button').click()
        assert driver.current_url == 'http://runescrape.lol/items'
        driver.back()
        driver.find_element_by_class_name('carousel-control-next').click()
        self.wait()
        driver.find_element_by_class_name('carousel-control-prev').click()

    def test_about(self):
        driver = self.driver
        driver.get("http://runescrape.lol/about")
        driver.implicitly_wait(60)
        assert driver.current_url.find("about") != -1
        elements = ['//*[@id="root"]/div/div/div/div[1]/div/p/p',
                    '//*[@id="root"]/div/div/div/div[2]/div/p/div',
                    '//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/h4',
                    '//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/h4/small',
                    '//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/p[1]',
                    '//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/p[2]/b',
                    '//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/p[3]/b',
                    '//*[@id="root"]/div/div/div/div[2]/div/p/div/div[1]/p[4]/b',
                    '//*[@id="root"]/div/div/div/div[3]/div/p/div/div/p[1]/b',
                    '//*[@id="root"]/div/div/div/div[3]/div/p/div/div/p[2]/b',
                    '//*[@id="root"]/div/div/div/div[3]/div/p/div/div/p[3]/b']
        for x in elements:
            assert driver.find_element_by_xpath(x).is_displayed()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[6]/div/p/div/div[1]/a').click()
        assert driver.current_url.find("report") != -1
        driver.back()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[6]/div/p/div/div[2]/a').click()
        assert driver.current_url.find("api") != -1
        driver.back()
        driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div[6]/div/p/div/div[3]/a').click()
        assert driver.current_url.find("idb") != -1

    def test_search(self):
        driver = self.driver
        driver.get('http://runescrape.lol')
        self.wait()
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/nav/div/ul/li[5]/div/div/input').is_displayed()
        driver.find_element_by_class_name('react-search-bar__field').click()
        driver.find_element_by_class_name('react-search-bar__input').send_keys('a')
        driver.find_element_by_class_name('react-search-bar__input').send_keys(Keys.ENTER)
        self.wait()
        assert driver.current_url == 'http://runescrape.lol/search/a'
        assert driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div[3]/div[1]/a').is_displayed()
        driver.find_element_by_class_name('card-img-container').click()
        self.wait()
        assert driver.current_url == 'http://runescrape.lol/items/11'
        driver.back()
        self.wait()
        expected_urls = ['http://runescrape.lol/skills/10', 'http://runescrape.lol/items/7',
                         'http://runescrape.lol/items/21', 'http://runescrape.lol/skills/16']
        sort_by = ['Name (Ascending)', 'Name (Descending)', 'Type (Ascending)', 'Type (Descending)']
        for i in range(0, 4):
            driver.find_element_by_class_name('Select-arrow-zone').click()
            input_box = driver.find_element_by_xpath('//div[@class="Select-input"]/input')
            input_box.send_keys(sort_by[i])
            input_box.send_keys(Keys.ENTER)
            driver.find_element_by_class_name('card-img-container').click()
            self.wait()
            assert driver.current_url == expected_urls[i]
            driver.back()
            self.wait()
        assert driver.find_element_by_class_name('pagination').is_displayed()

    def tearDown(self):
        self.driver.close()

    def wait(self):
        self.driver.implicitly_wait(10)

    def items_and_skills_test(self, page):
        driver = self.driver
        driver.get("http://runescrape.lol/" + str(page) + "s")
        self.wait()
        assert driver.current_url.find(str(page) + "s") != -1
        assert driver.find_element_by_class_name('card-img-container').is_displayed()
        assert driver.find_element_by_class_name('page-link').is_displayed()
        driver.find_element_by_class_name('card-img-container').click()
        self.wait()
        assert driver.current_url.find(str(page) + "s/1")
        assert driver.find_element_by_class_name('left-side').is_displayed()
        assert driver.find_element_by_class_name('right-side').is_displayed()

if __name__ == "__main__":
    unittest.main()