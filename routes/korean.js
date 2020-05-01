var express = require('express');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const getHtml = require('../utils/getHTML');
const URLs = require('../utils/URLs');
const iconv = require('iconv-lite');
const request = require('request');

// 인코딩 변환
//const Iconv = require('iconv').Iconv;
//var iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');

////////////////////////////////////////////////////////////////////////
//////////////////////////// 메인 페이지 ////////////////////////////////
////////////////////////////////////////////////////////////////////////

// 네이버 검색어
router.get('/naverKeyword', (req, res) => {

  const url = URLs.naverKeyword
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.ranking_box").children("div.list_group").children("ul.ranking_list").children("li");

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


// 네이버 뉴스
router.get('/naverMainNews', (req, res) => {

  const url = URLs.naverMainNews;

  const requestOptions = {
    method: "GET",
    url: url,
    encoding: null
  };

  request(requestOptions, function(error, response, body){    
    let ulList = [];
    const $ = cheerio.load(iconv.decode(body, 'EUC-KR'));
    const $bodyList = $("ul.list_txt").children("li");    
    
    $bodyList.each(function(i, elem) {
      const title = $(this).find('a').text();
      ulList[i] = {
          title: title,
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);

    res.send({status: 'success', data: data})

  })
});


// 네이버 엔터뉴스
router.get('/naverEnterNews', (req, res) => {

  const url = URLs.naverEnterNews;

  const requestOptions = {
    method: "GET",
    url: url,
    encoding: null
  };

  request(requestOptions, function(error, response, body){    
    let ulList = [];
    const $ = cheerio.load(iconv.decode(body, 'UTF-8'));
    const $bodyList = $("div.com_ranking").children("ul").children("li").children("a");
    
    $bodyList.each(function(i, elem) {
      if (i >= 10) {
        return false
      }
      ulList[i] = {
          title: $(this).find('p.tx').text(),
          link: $(this).attr('href')
      };
    });

    const data = ulList.filter(n => n.title);

    res.send({status: 'success', data: data})

  })
});


// 네이버 스포츠뉴스
router.get('/naverSportsNews', (req, res) => {

  const url = URLs.naverSportsNews;
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.aside_news_list").children("li");
    const link_pre = 'https://sports.news.naver.com';

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).text().trim(),
          link: link_pre + $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}));
});




////////////////////////////////////////////////////////////////////////
/////////////////////////////// 커뮤니티 ////////////////////////////////
////////////////////////////////////////////////////////////////////////

// 82cook 최근 많이 읽은 글
router.get('/82cook', (req, res) => {

  const url = URLs.cook
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.most").children("li");
    const link_pre = 'https://www.82cook.com';

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).text(), 
          link: link_pre + $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}));
});


// 불펜 최고 조회
router.get('/bullpen', (req, res) => {

  const url = URLs.bullpen
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.lists:nth-child(2)").children("li");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('a').text(), 
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}));
});


// 일간베스트 
router.get('/ilbe', (req, res) => {

  const url = URLs.ilbe
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("a.widget-more[href='/list/ilbe']").next().children("li");
    const link_pre = 'https://www.ilbe.com';
    
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('a').text(), 
          link: link_pre + $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}));
});


// 인스티즈 
router.get('/instiz', (req, res) => {

  const url = URLs.instiz
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.index_block_all").eq(10).children("div.index_block_list");
    const link_pre = 'https://www.instiz.net/';

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('span').remove().end().text(),
          link: link_pre + $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}));
});


// 루리웹 
router.get('/ruliweb', (req, res) => {

  const url = URLs.ruliweb
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.m_hit_article_2").children("div.widget_bottom").children("ul.bottom_list").children("li").children("a");
    
    $bodyList.each(function(i, elem) {
      if (i >= 10) {
        return false
      }
      ulList[i] = {
          title: $(this).find('span').remove().end().text().replace(/[\n\t]/g, "").trim(),
          link: 'https:' + $(this).attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}));
});


// 클리앙 
router.get('/clien', (req, res) => {

  const url = URLs.clien
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.section_list.recommended").children("div.section_body").children("div.list_item");
    const link_pre = 'https://www.clien.net';
    
    $bodyList.each(function(i, elem) {
      if (i >= 20) {
        return false
      }
      ulList[i] = {
          title: $(this).find('span.subject').text(),
          link: link_pre + $(this).find('a.list_subject').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
  })
  .then(response => res.send({status: 'success', data: response}));
});


// 나무위키 
router.get('/namu', (req, res) => {

  const url = URLs.namu;
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.link-list").eq(3).children("a");
    const link_pre = 'https://namu.live';
    
    $bodyList.each(function(i, elem) {
      var title = $(this).clone().find('span').remove().end().text().replace(/\n/g, "").replace(/\[[\d]+\]/, "").trim();
      ulList[i] = {
          title: title,
          link: link_pre + $(this).attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
    
  })
  .then(response => res.send({status: 'success', data: response}));
});


// 뽐뿌 
router.get('/ppomppu', (req, res) => {

  const url = URLs.ppomppu;

  const requestOptions = {
    method: "GET",
    url: url,
    encoding: null
  };

  request(requestOptions, function(error, response, body){    
    let ulList = [];
    const $ = cheerio.load(iconv.decode(body, 'EUC-KR'));
    const $bodyList = $('#hot-post-list').children("ul:first-child").children("li"); 
    const link_pre = 'https://www.ppomppu.co.kr';
    $bodyList.each(function(i, elem) {
      ulList[i] = {
        title: $(this).find('a.title').text().trim(),
        link: link_pre + $(this).find('a.title').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);

    res.send({status: 'success', data: data});
  })
});


// 네이트판 
router.get('/nate', (req, res) => {

  const url = URLs.nate;
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.talkRanking").children("ol").children("li").children("a");
    const link_pre = 'https://m.pann.nate.com';
    
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find("span.tit").text(),
          link: link_pre + $(this).attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
    
  })
  .then(response => res.send({status: 'success', data: response}));
});


// fmkorea 
router.get('/fm', (req, res) => {

  const url = URLs.fm;
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.fm_best_widget._bd_pc").children("ul").children("li").children("div").children("h3").children("a");
    const link_pre = 'https://m.fmkorea.com';
    
    $bodyList.each(function(i, elem) {
      tempArray = $(this).text().trim().split(" ");
      temp = tempArray.pop();
      title = tempArray.join(" ");
      ulList[i] = {
          title: title,
          link: link_pre + $(this).attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
    
    
  })
  .then(response => res.send({status: 'success', data: response}));
});




////////////////////////////////////////////////////////////////////////
//////////////////////////// 1boon kakao ///////////////////////////////
////////////////////////////////////////////////////////////////////////

router.get('/boon', (req, res) => {

  const url = URLs.boon;
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ol.list_classify").children("li"); 
    const link_pre = 'https://1boon.kakao.com';
    
    $bodyList.each(function(i, elem) {
      const imageLinkRaw = $(this).find('img.img_thumb').attr('src');
      const pattern = /S[0-9]+x[0-9]+/;
      const matched = pattern.exec(imageLinkRaw);
      var imageHeight = 400;
      if (matched != null) {
        tempHeight = /x[0-9]+/.exec(matched)[0].replace('x', '');
        imageHeight = parseInt(tempHeight)
      }
      
      ulList[i] = {
        title: $(this).find('strong.tit_thumb').text().trim(),
        link: link_pre + $(this).find('a.link_classify').attr('href'),
        imageLink: 'https:' + imageLinkRaw,
        imageHeight: imageHeight
      };
    });
    
    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}));

});

router.get('/boonv', (req, res) => {

  const url = URLs.boonv;
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ol.list_classify").children("li"); 
    const link_pre = 'https://1boon.kakao.com';
    
    $bodyList.each(function(i, elem) {
      const imageLinkRaw = $(this).find('img.img_thumb').attr('src');
      const pattern = /S[0-9]+x[0-9]+/;
      const matched = pattern.exec(imageLinkRaw);
      var imageHeight = 400;
      if (matched != null) {
        tempHeight = /x[0-9]+/.exec(matched)[0].replace('x', '');
        imageHeight = parseInt(tempHeight)
      }
      
      ulList[i] = {
        title: $(this).find('strong.tit_thumb').text().trim(),
        link: link_pre + $(this).find('a.link_classify').attr('href'),
        imageLink: 'https:' + imageLinkRaw,
        imageHeight: imageHeight
      };
    });
    
    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}));

});

module.exports = router;

