var express = require('express');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const googleTrends = require('google-trends-api');

// 네이버 검색어
router.get('/naverKeyword', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://datalab.naver.com/keyword/realtimeList.naver?where=main");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.ranking_box").children("ul.ranking_list").children("li");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          num: $(this).find('span.item_num').text(),
          title: $(this).find('span.item_title').text() 
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 구글 검색어
router.get('/googleKeyword', (req, res) => {
  googleTrends.realTimeTrends({
  geo: 'US',
  category: 'all',
  }, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    } 
  });
});


// 82cook 최근 많이 읽은 글
router.get('/82cook', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://www.82cook.com");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.most").children("li");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).text(), 
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 불펜 최고 조회
router.get('/bullpen', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("http://mlbpark.donga.com/mp/b.php?p=1&m=list&b=bullpen&query=&select=&user=");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.lists:nth-child(2)").children("li");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).text(), 
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 일간베스트 
router.get('/ilbe', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://www.ilbe.com");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("a.widget-more[href='/list/ilbe']").next().children("li");
    
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).text(), 
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 인스티즈 
router.get('/instiz', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://www.instiz.net");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.index_block_all").eq(9).children("div.index_block_list");
    
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).text(),
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 루리웹 
router.get('/ruliweb', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://bbs.ruliweb.com/best/humor/now");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.list.best_date.active").children("ul.col").children("li");
    
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('a').attr('title'),
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}) );
});



// 뽐뿌 
/*
router.get('/ppomppu', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://www.ppomppu.co.kr/");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.hot-post-list").children("ul:first-child").children("li");
    
    $bodyList.each(function(i, elem) {

      
      ulList[i] = {
          title: $(this).find('a.title ').text(),
          link: $(this).find('a.title ').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}) );
});
*/

// 클리앙 
router.get('/clien', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://www.clien.net/service/");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.section_list.recommended").children("div.section_body").children("div.list_item");
    
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('span.subject').text(),
          link: $(this).find('a.list_subject').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 나무위키 
router.get('/namu', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://namu.live");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.link-list").eq(3).children("a");
    
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).text(),
          link: $(this).attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
    
  })
  .then(response => res.send({status: 'success', data: response}) );
});



// Reddit 
router.get('/reddit', (req, res) => {
  
  const getHtml = async () => {
    try {
      return await axios.get("https://www.reddit.com");

    } catch (error) {
      console.error(error);
    }
  };
  
  getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.section_list.recommended").children("div.section_body").children("div.list_item");
    
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('span.subject').text(),
          link: $(this).find('a.list_subject').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}) );
});


module.exports = router;

