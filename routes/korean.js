var express = require('express');
var router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const getHtml = require('../utils/getHTML')
const URLs = require('../utils/URLs')

// 인코딩 변환
//const Iconv = require('iconv').Iconv;
//const iconv = new Iconv('euc-kr', 'utf-8//translit//ignore');

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


// 네이버 뉴스
router.get('/naverMainNews', (req, res) => {

  const url = URLs.naverMainNews
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.list_txt").children("li");

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


// 네이버 엔터뉴스
router.get('/naverEnterNews', (req, res) => {

  const url = URLs.naverEnterNews;
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.rank_lst").children("ul").children("li");
    console.log($bodyList);

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('a').text(),
          link: $(this).find('a').attr('href')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(response => res.send({status: 'success', data: response}) );
});


// 네이버 스포츠뉴스
router.get('/naverSportsNews', (req, res) => {

  const url = URLs.naverSportsNews
  
  getHtml(url)
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("#mostViewedNewsList").children("li");
    console.log($bodyList)

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

  const url = URLs.bullpen
  
  getHtml(url)
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

  const url = URLs.ilbe
  
  getHtml(url)
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

  const url = URLs.instiz
  
  getHtml(url)
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

  const url = URLs.ruliweb
  
  getHtml(url)
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


// 클리앙 
router.get('/clien', (req, res) => {

  const url = URLs.clien
  
  getHtml(url)
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

  const url = URLs.namu
  
  getHtml(url)
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


// 뽐뿌 
/*
router.get('/ppomppu', (req, res) => {

  const url = URLs.ppomppu
  
  getHtml(url)
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

module.exports = router;

