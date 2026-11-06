
/* ZAISEN channel view extension · 06 November 2026 · seller listings snapshot */
(function(){
"use strict";
const etsyListings={"1":["4580944938",99.99],"2":["4581162699",89.99],"3":["4581772044",64.99],"4":["4583624607",119.99],"5":["4581708807",54.99,74.99],"6":["4589649805",129.99],"7":["4582457215",79.99],"8":["4583736596",59.99],"9":["4583682507",99.99],"10":["4583671160",99.99],"11":["4582463061",99.99],"12":["4583651112",64.99],"13":["4583644161",59.99],"14":["4581866683",129.99],"15":["4590034618",109.99],"16":["4589650656",69.99],"17":["4588344246",64.99],"18":["4587282247",64.99],"19":["4587310513",64.99],"20":["4589005866",81.99],"21":["4589138866",79.99],"22":["4589153960",69.99],"23":["4589179039",69.99],"24":["4589911413",69.99],"25":["4589981414",119.99],"26":["4590081401",69.99],"27":["4597945664",89.99],"28":["4598211688",89.99],"29":["4602885473",99.99],"30":["4597917515",69.99],"31":["4603450789",89.99],"32":["4603458911",89.99],"33":["4603494123",54.99],"34":["4603521998",54.99],"35":["4603527858",54.99],"36":["4603530744",54.99],"37":["4603538424",54.99],"38":["4603521249",54.99],"39":["4581756107",89.99]};
;
const originalNumbers=numbers, originalExpandedHtml=expandedHtml, originalRenderProducts=renderProducts, originalRenderStats=renderStats;
const ratePresets={
 US:{label:"US bank",percent:0.03,flat:0.25},
 PK:{label:"Pakistan bank",percent:0.065,flat:0.30}
};
state.platform="shopify";
state.etsyBank="US";
state.etsyOffsite=false;
products.forEach(function(p){
 const entry=etsyListings[p.id];
 if(!entry)throw new Error("Missing verified Etsy listing for "+p.id);
 p.shopifyPrice=p.price;
 p.shopifyUrl=p.url;
 p.etsyListingId=entry[0];
 p.etsyPrice=entry[1];
 p.etsyMaxPrice=entry[2]||entry[1];
 p.etsyUrl="https://www.etsy.com/listing/"+entry[0];
});
const nav=document.querySelector(".sidebar");
const tabs=document.createElement("div");
tabs.className="platform-tabs";
tabs.setAttribute("aria-label","Sales channel dashboards");
tabs.innerHTML='<div class="platform-kicker">PROFIT DASHBOARDS</div>'+
 '<button type="button" class="platform-tab active" data-platform-tab="shopify" aria-pressed="true"><span class="platform-icon">S</span><span>Shopify Profit Dashboard<small>Website sales</small></span><span class="platform-arrow">›</span></button>'+
 '<button type="button" class="platform-tab" data-platform-tab="etsy" aria-pressed="false"><span class="platform-icon etsy-icon">E</span><span>Etsy Profit Dashboard<small>Marketplace sales</small></span><span class="platform-arrow">›</span></button>';
nav.insertBefore(tabs,document.querySelector(".nav-kicker"));
const hero=document.querySelector(".hero");
const shopDiscount=document.querySelector(".discount-picker");
shopDiscount.classList.add("shopify-only");
const etsyPreset=document.createElement("label");
etsyPreset.className="market-picker etsy-bank-picker etsy-only";
etsyPreset.setAttribute("for","etsyBankSelect");
etsyPreset.innerHTML='<span class="bank-icon">$</span><span style="flex:1"><span class="mini">ETSY PAYMENTS</span><select id="etsyBankSelect" aria-label="Bank country for Etsy payment processing"><option value="US">US bank · 3% + $0.25</option><option value="PK">Pakistan bank · 6.5% + $0.30</option></select></span>';
hero.querySelector(".hero-actions").appendChild(etsyPreset);
const discountSetting=$("discountSettingsInput").closest(".setting");
discountSetting.classList.add("shopify-only");
const feesSetting=document.createElement("div");
feesSetting.className="setting etsy-only";
feesSetting.innerHTML='<div><div class="setting-label">Offsite Ads attribution</div><div class="setting-info">If an Etsy Offsite Ad led to the sale, add 15% of the order value. No fee on unattributed orders.</div></div><label class="etsy-switch-label"><input id="etsyAdsInput" type="checkbox"><span>Include 15%</span></label>';
discountSetting.parentElement.insertBefore(feesSetting,discountSetting);
const existingPolicy=document.querySelector(".assumptions-grid article:last-child");
existingPolicy.classList.add("shopify-only");
const etsyPolicy=document.createElement("article");
etsyPolicy.className="panel etsy-only etsy-policy";
etsyPolicy.innerHTML='<div class="panel-title">Etsy fees & free shipping</div>'+
 '<div class="etsy-fee-line"><span>Transaction</span><strong>6.5% of item price</strong></div>'+
 '<div class="etsy-fee-line"><span>Listing / renewal</span><strong>$0.20 per sale</strong></div>'+
 '<div class="etsy-fee-line"><span>Payment processing</span><strong id="etsyRateLabel">3% + $0.25 (US bank assumed)</strong></div>'+
 '<div class="etsy-fee-line"><span>Offsite Ads</span><strong id="etsyAdsLabel">Excluded unless attributed</strong></div>'+
 '<div class="etsy-fee-line"><span>Customer delivery</span><strong>Free · every item</strong></div>'+
 '<p class="etsy-fee-foot">Etsy fees are estimates based on published rates. Actual fees depend on your bank country, taxes, ad attribution and currency. This tool does not connect to Etsy transactions.</p>';
existingPolicy.parentElement.appendChild(etsyPolicy);
const shopFineprint=document.querySelector(".assumptions > .fineprint");
shopFineprint.classList.add("shopify-only");
const etsyFineprint=document.createElement("div");
etsyFineprint.className="fineprint etsy-only";
etsyFineprint.innerHTML='<strong>Etsy profit estimate:</strong> listing price − product cost − full courier shipping cost − Etsy transaction, processing and listing/renewal fees, with optional Offsite Ads fees. Pricing is a snapshot of ZAISEN Etsy Shop Manager on 06 Nov 2026. Fees can differ by seller bank location, conversion, ad attribution, tax and additional Etsy charges. Excludes packaging, taxes on Etsy fees, returns, Payoneer withdrawal charges and other operating expenses. Prices are not live-synced.';
shopFineprint.after(etsyFineprint);
const headDate=document.querySelector(".snapshot");
const panelNote=document.querySelector(".panel-note");
const smallStat=document.querySelector("#statCount").closest(".stat-card").querySelector(".stat-foot");
const avgStat=document.querySelector("#statAvg").closest(".stat-card").querySelector(".stat-foot");
const tablePrice=document.querySelector(".products-table th:nth-child(6)");
const tableFee=document.querySelector(".products-table th:nth-child(7)");
const mainHero=document.querySelector(".hero h1");
const mainIntro=document.querySelector(".hero .intro");
const eyebrow=document.querySelector(".hero .eyebrow");
const sideFoot=document.querySelector(".sidebar-foot");
const switchButtons=Array.from(document.querySelectorAll("[data-platform-tab]"));
let localEtsyBank;
try{localEtsyBank=localStorage.getItem("zaisenEtsyBank")}catch(_){}
if(localEtsyBank==="PK"||localEtsyBank==="US")state.etsyBank=localEtsyBank;
$("etsyBankSelect").value=state.etsyBank;
numbers=function(p,m){
 if(state.platform!=="etsy")return originalNumbers(p,m);
 const basic=originalNumbers(p,m);
 const price=p.etsyPrice;
 const processing=ratePresets[state.etsyBank];
 const transaction=round(price*0.065);
 const payment=round(price*processing.percent+processing.flat);
 const listing=0.20;
 const ads=state.etsyOffsite?round(Math.min(100,price*0.15)):0;
 const fees=round(transaction+payment+listing+ads);
 const courier=basic.courier;
 const profit=courier==null?null:round(price-basic.cost-courier-fees);
 return Object.assign({},basic,{
   price:price,discount:0,net:price,buyerShip:0,collected:price,
   fees:fees,feeTransaction:transaction,feePayment:payment,
   feeListing:listing,feeAds:ads,
   profit:profit,margin:profit==null?null:profit/price
 });
};
function feeRow(name,value,deduct){
 return '<div><span>'+htmlEscape(name)+'</span><b'+(deduct?' class="country-deduct"':'')+'>'+(deduct?'−':'')+money(value)+'</b></div>';
}
expandedHtml=function(p){
 if(state.platform!=="etsy")return originalExpandedHtml(p);
 const selected=numbers(p,market());
 const maxNote=p.etsyMaxPrice>p.etsyPrice?' · Listing has variants up to '+money(p.etsyMaxPrice)+'; calculated using the '+money(p.etsyPrice)+' option.':'';
 const mismatch=p.id===8?' · Etsy title mentions 6 or 9 pieces, while the Shopify cost model is for 3 pieces. Verify before relying on this margin.':'';
 let cards=markets.map(function(m){
  const c=numbers(p,m);
  return '<article class="country-card '+(m.id===state.market?'country-selected':'')+'">'+
   '<div class="country-card-head"><div class="country-title"><span class="country-flag">'+m.flag+'</span><div><strong>'+htmlEscape(m.name)+'</strong><span>'+c.weight+' kg shipment · free delivery</span></div></div>'+(m.id===state.market?'<span class="current-market-label">Selected</span>':'')+'</div>'+
   '<div class="country-profit"><span>ETSY PROFIT PER SALE</span><strong class="'+(c.profit<0?'profit-negative':'')+'">'+money(c.profit)+'</strong><small>'+pct(c.margin)+' margin · after Etsy fees</small></div>'+
   '<div class="country-breakdown" aria-label="Etsy calculation details">'+
   feeRow("Etsy listed price",c.price,false)+
   feeRow("Customer shipping",0,false)+
   feeRow("Transaction · 6.5%",c.feeTransaction,true)+
   feeRow("Payment processing",c.feePayment,true)+
   feeRow("Listing / renewal",c.feeListing,true)+
   (state.etsyOffsite?feeRow("Offsite Ads · 15%",c.feeAds,true):'')+
   '<div class="subtotal-line"><span>Total Etsy fees</span><b>−'+money(c.fees)+'</b></div>'+
   feeRow("Our product cost",c.cost,true)+
   feeRow("Our courier cost",c.courier,true)+
   '</div><div class="country-card-total"><span>Estimated profit</span><strong class="'+(c.profit<0?'profit-negative':'')+'">'+money(c.profit)+'</strong></div></article>';
 }).join("");
 return '<section class="details" role="region" aria-label="'+htmlEscape(p.name)+' Etsy profitability">'+
 '<div class="detail-head"><div class="detail-intro"><span class="detail-eyebrow">ETSY PROFIT BREAKDOWN · 5 MARKETS</span><h3>'+htmlEscape(p.name)+'</h3><p>Verified Etsy listing price · Free shipping to customers · Fees after the sale</p></div>'+
 '<a class="visit" href="'+p.etsyUrl+'" target="_blank" rel="noopener noreferrer">View Etsy listing ↗</a></div>'+
 '<div class="detail-summary">'+
 '<div class="detail-summary-info"><span>Our product cost</span><strong>'+money(selected.cost)+'</strong></div>'+
 '<div class="detail-summary-info"><span>Parcel weight</span><strong>'+selected.weight+' kg</strong></div>'+
 '<div class="detail-summary-info"><span>Etsy listing price</span><strong>'+money(selected.price)+'</strong></div>'+
 '<div class="detail-summary-info"><span>Etsy fees / sale</span><strong>'+money(selected.fees)+'</strong></div>'+
 '</div><div class="country-heading"><h4>Compare Etsy profits by destination</h4><p>Free customer shipping in every market · Fees based on '+htmlEscape(ratePresets[state.etsyBank].label)+'</p></div>'+
 '<div class="country-grid">'+cards+'</div>'+
 '<p class="detail-foot">Actual selling fees depend on the bank country and order circumstances. All courier charges are paid by ZAISEN.'+
 htmlEscape(maxNote+mismatch)+' Estimates exclude Etsy fee taxes, bank withdrawals, currency conversion, marketing not selected here and other overhead.</p>'+
 '</section>';
};
renderStats=function(){
 originalRenderStats();
 if(state.platform!=="etsy")return;
 $("footMarket").textContent=market().name+" · Etsy FREE customer delivery · USD estimates";
 smallStat.textContent="From ZAISEN Etsy Shop Manager";
 avgStat.textContent="After Etsy fees, product & courier costs";
};
renderProducts=function(){
 originalRenderProducts();
 if(state.platform!=="etsy")return;
 document.querySelectorAll("#productRows tr.product-row").forEach(function(row){
   const p=products.find(q=>q.id===Number(row.dataset.id));
   if(!p)return;
   const tag=row.querySelector(".popup-tag");
   if(tag){tag.textContent=money(numbers(p,market()).fees);tag.classList.add("etsy-fee-tag")}
 });
 document.querySelectorAll(".mobile-item").forEach(function(item){
   const button=item.querySelector("button[data-id]");
   if(!button)return;
   const p=products.find(q=>q.id===Number(button.dataset.id));
   if(!p)return;
   const c=numbers(p,market());
   const info=item.querySelector(".mobile-item-main small");
   if(info)info.textContent=c.weight+" kg · "+money(p.etsyPrice)+" · Etsy fees "+money(c.fees);
 });
};
function toggleChannel(platform){
 if(platform!=="etsy"&&platform!=="shopify")return;
 state.platform=platform;
 document.body.dataset.platform=platform;
 state.expanded.clear();
 const isEtsy=platform==="etsy";
 products.forEach(function(p){p.price=isEtsy?p.etsyPrice:p.shopifyPrice;p.url=isEtsy?p.etsyUrl:p.shopifyUrl});
 switchButtons.forEach(function(btn){
  const active=btn.dataset.platformTab===platform;
  btn.classList.toggle("active",active);
  btn.setAttribute("aria-pressed",String(active));
 });
 mainHero.innerHTML=isEtsy?'Know what every <em>Etsy sale earns.</em>':'Know what every <em>piece earns.</em>';
 mainIntro.textContent=isEtsy?'39 verified Etsy listings. Free delivery for buyers in every market; see Etsy fees, courier charges and estimated take-home profit for each product.':'Real ZAISEN products, straightforward costs, and country-by-country profit estimates. Click any product to see exactly where the money goes.';
 eyebrow.textContent=isEtsy?'Etsy marketplace · profit dashboard':'Commerce intelligence dashboard';
 headDate.innerHTML=isEtsy?'<span class="dot"></span>ETSY LISTINGS <span style="color:#c0c6bd">·</span> 06 NOV 2026':'<span class="dot"></span>SHOPIFY SNAPSHOT <span style="color:#c0c6bd">·</span> 06 NOV 2026';
 sideFoot.querySelector("div").firstChild.textContent=isEtsy?'Etsy catalog snapshot':'Shopify catalog snapshot';
 panelNote.textContent=isEtsy?'One-item sales · current Etsy fee assumptions':'Single-item orders · current editable discount';
 tableFee.textContent=isEtsy?'Etsy fees':'Discounts';
 tablePrice.textContent=isEtsy?'Etsy price':'Live price';
 document.querySelector("#products .section-head p").textContent=isEtsy?'39 Etsy listings with verified seller prices. Click a row for fees and profit in five countries.':'One row per product. Select a row for a clear breakdown of all five markets.';
 document.querySelector(".callout").innerHTML=isEtsy?'<strong>Etsy fees:</strong> 6.5% transaction + payment processing + $0.20 listing/renewal. Optional Offsite Ads add 15% on attributed orders. Free delivery to every customer.':'<strong>How to use:</strong> Choose a country above or click its bar to recalculate all 39 products. Click any product row to compare all five destinations.';
 $("etsyRateLabel").textContent=(state.etsyBank==="US"?'3% + $0.25 · US bank assumed':'6.5% + $0.30 · Pakistan bank assumed');
 $("etsyAdsLabel").textContent=state.etsyOffsite?'15% on attributed orders':'Excluded unless attributed';
 document.title=isEtsy?'ZAISEN | Etsy Profit Dashboard':'ZAISEN | Shopify Profit Dashboard';
 renderAll();
}
tabs.addEventListener("click",function(e){const btn=e.target.closest("[data-platform-tab]");if(btn)toggleChannel(btn.dataset.platformTab)});
$("etsyBankSelect").addEventListener("change",function(e){
 state.etsyBank=e.target.value;
 try{localStorage.setItem("zaisenEtsyBank",state.etsyBank)}catch(_){}
 toggleChannel("etsy");
});
$("etsyAdsInput").addEventListener("change",function(e){state.etsyOffsite=e.target.checked;toggleChannel("etsy")});
$("csvButton").addEventListener("click",function(e){
 if(state.platform!=="etsy")return;
 e.preventDefault();e.stopImmediatePropagation();
 const m=market();
 const cols=["Product","Category","Product cost USD","Courier USD","Weight kg","Etsy price USD","Etsy transaction fee USD","Etsy processing fee USD","Listing renewal USD","Offsite Ads USD","Total Etsy fees USD","Estimated profit USD","Margin %","Etsy listing URL"];
 const rows=renderedProducts().map(function(p){
  const c=numbers(p,m);
  return [p.name,p.category,c.cost,c.courier,c.weight,p.etsyPrice,c.feeTransaction,c.feePayment,c.feeListing,c.feeAds,c.fees,c.profit,(c.margin*100).toFixed(1),p.etsyUrl];
 });
 const q=function(s){return '"'+String(s==null?"":s).replace(/"/g,'""')+'"'};
 const csv="\uFEFF"+[cols].concat(rows).map(function(row){return row.map(q).join(",")}).join("\r\n");
 const blob=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
 const a=document.createElement("a");a.href=blob;a.download="ZAISEN_Etsy_Profit_"+m.id+".csv";
 document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(blob)},500);
},true);
toggleChannel("shopify");
})();
