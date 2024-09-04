/* global Deno */
import * as a from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/all.mjs'
import * as p from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/prax.mjs'
import * as dg from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/dom_glob_shim.mjs'
// import {paths as pt} from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/io_deno.mjs'
import * as pt from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/path.mjs'

import * as l from './live.mjs'

import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'

import * as data from './data/data.js';

const {E} = new p.Ren(dg.document).patchProto(dg.glob.Element)

const DEV = Deno.args.includes(`--dev`)

class Page extends a.Emp {
  constructor(site) {
    // console.log(site)
    super()
    this.site = a.reqInst(site, Site)
  }

  urlPath() {return ``}

  fsPath() {
    const path = a.laxStr(this.urlPath())
    return path && a.stripPre(path, `/`) + `.html`
  }

  targetPath() {
    const path = a.laxStr(this.fsPath())
    return path && pt.posix.join(`target`, path)
  }

  title() {return ``}

  res() {return a.resBui().html(this.body()).res()}

  body() {return ``}

  
  async write() {
    const path = pt.toPosix(this.targetPath())
    if (!path) return

    const body = this.body()
    if (!body) return

    await Deno.mkdir(pt.posix.dir(path), {recursive: true})
    // console.log(path)
    // console.log(pt.dir(path))
    await Deno.writeTextFile(path, body)

    console.log(`[html] wrote`, path)
  }
}

// 404 //
class Page404 extends Page {
  // Only for `Nav`.
  urlPath() {return `404`}
  fsPath() {return `404.html`}
  title() {return `Страница не найдена`}
  res() {return a.resBui().html(this.body()).code(404).res()}

  body() {
    const tit = `Ошбика: 404`
    const desc = `Ошбика 404`
    const img = `https://drinkibri.ru/images/404.jpg`
    return Layout(tit, desc, img,
      Nav(this),
      E.main.chi(
        E.a.props({href: `/`, class: `error`}).chi(
          E.h1.chi(this.title()),
          E.img.props({alt: `404`, src: `/images/404.jpg`, class: `error`})
        )        
      ),
      Footer(this)
    )
  }
}

// Main //
class PageIndex extends Page {
  urlPath() {return `/`}
  fsPath() {return `index.html`}
  title() {return `Главная`}

  body() {
  const tit = `Ibri`
  const desc = `Ибри (Ibri) — авторские газированные напитки. Продукт бренда Ибри, идея Ибри.`
  const img = `https://drinkibri.ru/images/ibri-title.jpg`
    return Layout(tit, desc, img,
      Nav(this),
      E.main.chi(
        E.heyibri.chi(
          // E.h1.chi(E.span.chi(`Ибри`), ` — это ещё и вкусный напиток`),
          E.img.props({src: `/images/ibri-title.jpg`, alt: `Ibri`}),
          E.div.chi(`Приветствуем тебя на сайте напитков Ибри! :)`)
        ),
        E.block.chi(
          E.div.props({class: `block-info`}).chi(
            E.h2.chi(`Идея`),
            E.a.props({href: `/brand`}).chi(`Подробнее`),
            E.div.chi(Md(`./data/idea.md`)).props({class: `idea`}),
          ),
          E.div.props({class: `idea-ingri`}).chi(
            getItem(data.brand)
          )
        ),
      ),
      Footer(this)
    )
  }
}
function getItem(a) {
  return a.map((val) => {
    return E.div.props({class: `i-ingri`}).chi(
      E.div.props({class: `i-ingri-img`}).chi(E.img.props({src: val.src, alt: val.name})),
      E.h3.chi(val.name)
    )
  })
}


class Site extends a.Emp {
  constructor() {
    super()
    this.notFound = new Page404(this)
    this.nav = [new PageIndex(this)]
  }
  all() {return [this.notFound, ...this.nav]}  
}
export const site = new Site()
// console.log(site.all())

function Layout(tit, desc, img, ...chi) {
  return p.renderDocument(
    E.html.chi(
      E.head.chi(
        E.meta.props({charset: `utf-8`}),
        E.meta.props({name: `viewport`, content: `width=device-width, initial-scale=1`}),
        E.title.chi(tit),
        E.meta.props({name: `description`, content: desc}),
        E.meta.props({name: `keywords`, content: `газированные напитки, коктейли, натуральные напитки, миксология`}),
        E.meta.props({property: `og:title`, content: tit}),
        E.meta.props({property: `og:description`, content: desc}),
        E.meta.props({property: `og:type`, content: `website`}),
        E.meta.props({property: `og:site_name`, content: `drinkibri.ru`}),
        E.meta.props({property: `og:url`, content: `https://drinkibri.ru/`}),
        E.meta.props({property: `og:image`, content: img}),
        E.meta.props({property: `og:image:height`, content: `600`}),
        E.meta.props({property: `og:image:width`, content: `300`}),
        E.meta.props({property: `og:image:type`, content: `image/jpeg`}),
        E.link.props({rel: `icon`, type: `image/x-icon`, href: `/images/ibri-icon.png`}),
        E.link.props({rel: `stylesheet`, href: `/main.css`}),
        E.style.chi(`@import url('https://fonts.googleapis.com/css2?family=Geologica:wght,CRSV,SHRP@100..900,0..1,0..100&family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');`),
        a.vac(DEV) && E.script.chi(`navigator.serviceWorker.register('/sw.mjs')`),
        Md(`./data/anal.md`)
      ),
      E.body.chi(chi, 
        E.div.props({class: `popup`, id: `popup`}).chi(
          E.span.props({class: `close`, id: `closeBtn`}).chi(`☓`),
          E.div.props({class: `popup-content`}).chi(
          E.img.props({id: `popupImage`, src: ` `, alt: `Popup Image`})
        ))
      ),
      E.script.props({type: `module`, src: `/browser.mjs`, defer: ``}),
      // E.script.props({type: `module`, src: `/site.mjs`}),
      a.vac(DEV) && E.script.props({type: `module`, src: l.LIVE_CLIENT}),
    )
  )
}

function Nav(page) {
  return E.header.chi(
    E.a.props({href: `/`, class: `logo`}).chi(E.img.props({src: `/images/ibri-logo-white.svg`, alt: `Ibri`})),
    E.nav.chi(a.map(page.site.nav, PageLink), E.menu.chi(
      getMenu()
    )),
    E.mobilemenu.chi(a.map(page.site.nav, PageLink)),
  )
}
function getMenu() {
  return Array.from({ length: 9 }, () => E.div)
}


function NavFooter(page) {
  return E.nav.chi(a.map(page.site.nav, PageLink)
    )
}
const currentYear = new Date().getFullYear();
function Footer(page) {
  return E.footer.props({id: `footer`}).chi(
    E.img.props({alt: `Ibri`, src: `/images/ibri-logo-white.svg`}),
    E.p.chi(`Ibri® — все права защищены. Любое использование либо копирование материалов сайта, 
      допускается только cо ссылкой на источник`),
      E.div.chi(
        Contact(data.contact)
      ),
      NavFooter(page),
    E.span.chi(E.a.props({href: `https://github.com/diatom/ibri`}).
    chi(`© ${currentYear}. Сайт сделал Severin B. 👾`)
    )
  )
}

function PageLink(page) {
  a.reqInst(page, Page)
  const pro = {
    href: page.urlPath(),
    id: page.title(),
  }
  if (page.title() === "Ibri®") {
    pro.target = "_blank"
    pro.rel = "noopener noreferrer"
  }
  return E.a.props(pro).chi(page.title())
}

function Contact(cont) {
  return cont.map((val) => {
    for (let [key, value] of Object.entries(val)) {
      return E.a.props({href: value}).chi(key)
    }
  })
}

function AllTags(page) {
  return E.tags.chi(
    E.span.props({class: `help`}).chi(`Теги:`),
    data.arttags.map(val => 
      E.button.props({type: `button`, class: `btn`}).chi(E.span.chi(`#`), val)
    )
  )
}

function ArtTags(tag) {
  return E.arttags.chi(
    E.span.props({class: `help`}).chi(`Теги:`),
    tag.map((val) => 
      E.button.props({type: `button`, class: `btn`}).chi(E.span.chi(`#`), val)
    )
  )
}

function BookTags(tag) {
  return E.tags.chi(
    E.span.props({class: `help`}).chi(`Теги:`),
    tag.map(val =>
      E.button.props({type: `button`, class: `btn`, id: val.id}).chi(E.span.chi(`#`), val.n)
    )
  )
}

function Md(md) {
  return new p.Raw(marked(Deno.readTextFileSync(md)))
}