import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SchemaOrg from '@/components/SchemaOrg'
import EmergencyBar from '@/components/EmergencyBar'
import { BASE_URL, PHONE, PHONE_DISPLAY, EMAIL } from '@/lib/metadata'
import { BASE_PATH } from '@/lib/asset-path'

export const metadata: Metadata = {
  title: {
    default: 'Николов инжинеринг | Електротехник София | +359 88 888 8888',
    template: '%s | Николов инжинеринг',
  },
  description: `Лицензиран електротехник в София. Смяна на табло, нова инсталация, авариен електротехник 24/7. Обадете се: ${PHONE_DISPLAY}`,
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: `${BASE_PATH}/favicon.png`,
    apple: `${BASE_PATH}/apple-touch-icon.png`,
  },
  other: {
    'geo.region': 'BG-SO',
    'geo.placename': 'Sofia',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <head>
        <SchemaOrg />
        <link rel="sitemap" type="application/xml" href={`${BASE_PATH}/sitemap.xml`} />
      </head>
      <body className="bg-slate-50 pb-20">
        <Header />
        <main>{children}</main>
        <Footer />
        <EmergencyBar phone={PHONE} phoneDisplay={PHONE_DISPLAY} email={EMAIL} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-VE056CYH3H');window.addEventListener('load',function(){var s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id=G-VE056CYH3H';document.head.appendChild(s)})`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  if(!('modelContext' in navigator))return;
  var ac=new AbortController();
  var mc=navigator.modelContext;
  mc.registerTool({
    name:'getBusinessInfo',
    description:'Returns the name, address, license number, and operating hours of the electrical contractor.',
    inputSchema:{type:'object',properties:{},required:[]},
    execute:function(){return Promise.resolve({name:'Николов инжинеринг',address:'гр. София 1421, ж.к Лозенец, ул. Йоан Екзарх 13',license:'ЛТ-0001/2020',hours:{weekdays:'08:00–20:00',saturday:'09:00–17:00',emergency:'24/7'}})}
  },{signal:ac.signal});
  mc.registerTool({
    name:'getServices',
    description:'Returns the list of electrical services offered.',
    inputSchema:{type:'object',properties:{},required:[]},
    execute:function(){return Promise.resolve({services:['Ремонт на електроинсталация','Монтаж на осветление','Смяна на ел. табло','Диагностика на ел. проблеми','Авариен електротехник 24/7','Нова ел. инсталация']})}
  },{signal:ac.signal});
  mc.registerTool({
    name:'getContactInfo',
    description:'Returns phone, email and website URL for booking or inquiries.',
    inputSchema:{type:'object',properties:{},required:[]},
    execute:function(){return Promise.resolve({phone:'+359899887752',email:'elmaistor1@gmail.com',url:'https://elektrouslugisofia.bg',viber:'+359899887752',whatsapp:'+359899887752'})}
  },{signal:ac.signal});
  window.addEventListener('unload',function(){ac.abort()});
})()`,
          }}
        />
      </body>
    </html>
  )
}
