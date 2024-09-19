/* global Deno */
import * as a from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/all.mjs'
import * as p from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/prax.mjs'
import * as dg from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/dom_glob_shim.mjs'
// import {paths as pt} from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/io_deno.mjs'
import * as pt from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/path.mjs'

import * as l from './live.mjs'

import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'

import * as data from './data/data.js'

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
    const img = `https://statham.fun/images/statham.png`
    return Layout(tit, desc, img,
      E.main.chi(
        E.a.props({href: `/`, class: `error`}).chi(
          E.h1.chi(this.title()),
          E.img.props({alt: `404`, src: `/images/statham.png`, class: `error`})
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
  const tit = `Клуб четырёх коней`
  const desc = `Сайт международного Васюкинского турнира по шахматам`
  const img = `https://statham.fun/images/statham.png`
    return Layout(tit, desc, img,
      // Nav(this),
      E.main.chi(
        E.hey.chi(
          E.div.props({class: `img-hey`}).chi(
            E.img.props({src: `images/city.png`, alt: `City`, class: `img-city`}), 
            E.img.props({src: `images/back-paper.png`, alt: `City`, class: `img-paper`}), 
            E.img.props({src: `images/circle.svg`, alt: `Circle`, class: `img-circle`}),
          ),
          E.div.props({class: `hey-main`}).chi(
            E.div.props({class: `logo`}).chi(
              E.img.props({src: `images/logo.svg`, alt: `Horse-logo`}),
              E.div.props().chi(`Клуб четырех коней`)
            ),
            E.div.props({class: `greeting`}).chi(
              E.h1.chi(`Превратите уездный город`),
              E.h1.chi(`в столицу земного шара`),
              E.div.props({class: `greeting-info`}).chi(`Оплатите взнос на телеграммы для организации Международного васюкинского турнира по шахматам`),
              E.div.props({class: `greeting-buttons`}).chi(
                E.button.props({}).chi(`Поддержать
шахматную мысль`),
                E.button.props({}).chi(`Подробнее
о турнире`),
              )
            ),
          ),
        ),
        E.div.props({class: `running-line`}).chi(
          E.div.props({class: `line-block`}).chi(
            E.div.props({class: `line-text`}).chi(`Дело помощи утопающим — дело рук самих утопающих!`),
            E.div.props({class: `circle`}).chi(``),
            E.div.props({class: `line-text`}).chi(`Шахматы двигают вперед не только культуру, но и экономику!`),
            E.div.props({class: `circle`}).chi(``),
            E.div.props({class: `line-text`}).chi(`Лед тронулся, господа присяжные заседатели!`),
            E.div.props({class: `circle`}).chi(``),
          )
        ),
        // E.div.props({class: `running-line`}).chi(
        //   E.div.props({class: `line-block`}).chi(`Дело помощи утопающим — дело рук самих утопающих!`),
        //   E.div.props({class: `circle`}).chi(``),
        //   E.div.props({class: `line-block`}).chi(`Шахматы двигают вперед не только культуру, но и экономику!`),
        //   E.div.props({class: `circle`}).chi(``),
        //   E.div.props({class: `line-block`}).chi(`Лед тронулся, господа присяжные заседатели!`),
        //   E.div.props({class: `circle`}).chi(``),
        // ),
        E.block.props({}).chi(
          E.div.props({class: `block-info-members`}).chi(
            E.h4.props({}).chi(`Чтобы поддержать Международный васюкинский турнир посетите лекцию на тему:`, E.span.chi(` «Плодотворная дебютная идея»`)),
          ),
          E.img.props({src: `images/members.png`, alt: `Members`, class: `img-members`}),
        ),
        E.block.props({}).chi(
          E.img.props({src: `images/member.png`, alt: `Member`, class: `img-member`}),
          E.div.props({class: `block-info-member`}).chi(
            E.h4.chi(`и Сеанс `, E.span.chi(`одновременной игры в шахматы на 160 досках`), ` гроссмейстера О. Бендера`),
            E.table.chi(
              E.thead.chi(E.tr.chi(E.th.chi(``), E.th.chi())),
              E.tbody.chi(
                E.tr.chi(E.td.chi(`Место проведения:`), E.td.chi(`Клуб «Картонажник»`)),
                E.tr.chi(E.td.chi(`Дата и время мероприятия:`), E.td.chi(`22 июня 1927 г. в 18:00`)),
                E.tr.chi(E.td.chi(`Стоимость входных билетов:`), E.td.chi(`20 коп.`)),
                E.tr.chi(E.td.chi(`Плата за игру:`), E.td.chi(`50 коп.`)),
                E.tr.chi(E.td.chi(`Взнос на телеграммы:`), E.td.chi(E.span.chi(`100 руб.`), `21 руб. 16 коп.`)),
              ),
            ),
            E.div.props({class: `info-petition`}).chi(`По всем вопросам обращаться в администрацию к К. Михельсону`)
          ),
        ),
        E.block.chi(
          E.div.props({class: `head-steps`}).chi(
            E.h3.chi(`Этапы преображения`),
            E.h3.chi(`Васюков`),
            E.p.chi(`Будущие источники обогащения васюкинцев`)
          ),
          E.div.props({class: `steps`}).chi(
            E.div.props({class: `step`}).chi(E.div.props({class: `step-num`}).chi(`1`), E.div.props({class: `step-content`}).chi(`Строительство железнодорожной магистрали Москва-Васюки`)),
            E.div.props({class: `step`}).chi(E.div.props({class: `step-num`}).chi(`2`), E.div.props({class: `step-content`}).chi(`Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов`)),
            E.div.props({class: `step`}).chi(E.div.props({class: `step-num`}).chi(`3`), E.div.props({class: `step-content`}).chi(`Поднятие сельского хозяйства в радиусе на тысячу километров: производство 
              овощей, фруктов, икры, шоколадных конфет`)),
            E.div.props({class: `step`}).chi(E.div.props({class: `step-num`}).chi(`4`), E.div.props({class: `step-content`}).chi(`Строительство дворца для турнира`)),
            E.div.props({class: `step`}).chi(E.div.props({class: `step-num`}).chi(`5`), E.div.props({class: `step-content`}).chi(`Размещение гаражей для гостевого автотранспорта`)),
            E.div.props({class: `step`}).chi(E.div.props({class: `step-num`}).chi(`6`), E.div.props({class: `step-content`}).chi(`Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов`)),
            E.div.props({class: `step`}).chi(E.div.props({class: `step-num`}).chi(`7`), E.div.props({class: `step-content`}).chi(`Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов 
              и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн`), E.img.props({src: `images/jet.png`, alt: `Jet`, class: `jet-img`})),
          )
        ),
        E.block.props({}).chi(
          E.div.props({class: `head-players`}).chi(
            E.h3.chi(`Участники турнира`),
            E.div.props({class: `arrow-buttons`}).chi(
              E.button.props({class: `arrow`}).chi(E.img.props({src: `images/arrow.svg`, alt: `arrow`})),
              E.div.props({class: `slider-num`}).chi(`3 / 6`),
              E.button.props({class: `arrow`}).chi(E.img.props({src: `images/arrow.svg`, alt: `arrow`})),
            )
          ),
          E.div.props({class: `slide-players`}).chi(
            E.div.props({class: `avatar`}).chi(
              E.img.props({src: `images/avatar.svg`, alt: `Avatar`}),
              E.h5.chi(`Хозе-Рауль Капабланка`),
              E.div.chi(`Чемпион мира по шахматам`),
              E.button.props({}).chi(`Подробнее`)
            ),
            E.div.props({class: `avatar`}).chi(
              E.img.props({src: `images/avatar.svg`, alt: `Avatar`}),
              E.h5.chi(`Эммануил Ласкер`),
              E.div.chi(`Чемпион мира по шахматам`),
              E.button.props({}).chi(`Подробнее`)
            ),
            E.div.props({class: `avatar`}).chi(
              E.img.props({src: `images/avatar.svg`, alt: `Avatar`}),
              E.h5.chi(`Александр Алехин`),
              E.div.chi(`Чемпион мира по шахматам`),
              E.button.props({}).chi(`Подробнее`)
            ),
          ),
          E.div.props({class: `slide-players`}).chi(
            E.div.props({class: `avatar`}).chi(
              E.img.props({src: `images/avatar.svg`, alt: `Avatar`}),
              E.h5.chi(`Арон Нимцович`),
              E.div.chi(`Чемпион мира по шахматам`),
              E.button.props({}).chi(`Подробнее`)
            ),
            E.div.props({class: `avatar`}).chi(
              E.img.props({src: `images/avatar.svg`, alt: `Avatar`}),
              E.h5.chi(`Рихард Рети`),
              E.div.chi(`Чемпион мира по шахматам`),
              E.button.props({}).chi(`Подробнее`)
            ),
            E.div.props({class: `avatar`}).chi(
              E.img.props({src: `images/avatar.svg`, alt: `Avatar`}),
              E.h5.chi(`Остап Бендер`),
              E.div.chi(`Чемпион мира по шахматам`),
              E.button.props({}).chi(`Подробнее`)
            ),
          )
        )
      ),
      E.div.props({class: `running-line`}).chi(
        E.div.props({class: `line-block`}).chi(
          E.div.props({class: `line-text`}).chi(`Дело помощи утопающим — дело рук самих утопающих!`),
          E.div.props({class: `circle`}).chi(``),
          E.div.props({class: `line-text`}).chi(`Шахматы двигают вперед не только культуру, но и экономику!`),
          E.div.props({class: `circle`}).chi(``),
          E.div.props({class: `line-text`}).chi(`Лед тронулся, господа присяжные заседатели!`),
          E.div.props({class: `circle`}).chi(``),
        )
      ),
      Footer(this)
    )
  }
}
function getItem(a) {
  return E.div.chi(
    a.map((val) => {
      return E.div.props({class: `quote`, id: a.indexOf(val)}).chi(E.button.chi(
        E.img.props({src: `images/anchor.svg`, alt: `anchor`, class: `a-svg`})
      ).props({class: `copy-b`}), `— ` + val)
    })
)
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
        E.meta.props({name: `keywords`, content: `шахматы, турнир, Васюки`}),
        E.meta.props({property: `og:title`, content: tit}),
        E.meta.props({property: `og:description`, content: desc}),
        E.meta.props({property: `og:type`, content: `website`}),
        // E.meta.props({property: `og:site_name`, content: `statham.fun`}),
        // E.meta.props({property: `og:url`, content: `https://statham.fun/`}),
        E.meta.props({property: `og:image`, content: img}),
        E.meta.props({property: `og:image:height`, content: `600`}),
        E.meta.props({property: `og:image:width`, content: `300`}),
        E.meta.props({property: `og:image:type`, content: `image/jpeg`}),
        E.link.props({rel: `icon`, type: `image/x-icon`, href: `/images/icon.svg`}),
        E.link.props({rel: `stylesheet`, href: `/main.css`}),
        E.style.chi(`@import url('https://fonts.googleapis.com/css2?family=Golos+Text:wght@400..900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap');`),
        a.vac(DEV) && E.script.chi(`navigator.serviceWorker.register('/sw.mjs')`),
        // Md(`./data/anal.md`)
      ),
      E.body.chi(chi),
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


function Footer(page) {
  return E.footer.props({id: `footer`}).chi(
    E.div.chi(`Все персонажи, события и цитаты являются вымышленными и не принадлежат создателям сайта. 
      С подробностями можно познакомиться в главе XXXIV романа Ильи Ильфа и Евгения Петрова «Двенадцать стульев».`),
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