/* Nexora Digital — navigation, calculator and estimate handoff */
(function(){
  var navButton=document.querySelector('.nav-toggle');
  var nav=document.querySelector('.nav-links');
  if(navButton&&nav){navButton.addEventListener('click',function(){var open=nav.classList.toggle('is-open');navButton.setAttribute('aria-expanded',String(open));});}
  document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=String(new Date().getFullYear());});
  var form=document.querySelector('[data-pricing-calculator]');
  if(form){
    var plan=form.querySelector('[name="plan"]');
    var pages=form.querySelector('[name="pages"]');
    var pagesField=document.getElementById('pages-field');
    var total=document.getElementById('estimate-total');
    var monthly=document.getElementById('estimate-monthly');
    var breakdown=document.getElementById('estimate-breakdown');
    var request=document.getElementById('estimate-request');
    var cad=function(n){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(n);};
    function calculate(){
      var isOne=plan.value==='one';
      pagesField.hidden=isOne;
      if(isOne){pages.value='1';}
      if(!isOne&&Number(pages.value)<3){pages.value='3';}
      var num=Math.min(15,Math.max(isOne?1:3,Math.round(Number(pages.value)||3)));
      pages.value=String(num);
      var base=isOne?350:500;
      var extraPages=isOne?0:Math.max(0,num-3)*90;
      var chosen=[['Starter website ('+(isOne?'one page':'up to three pages')+')',base]];
      if(extraPages)chosen.push(['Additional pages ('+(num-3)+' × $90)',extraPages]);
      var addons=[
        ['booking','Online booking integration',175],
        ['copy','Copywriting assistance',125],
        ['seo','Additional on-page SEO setup',150]
      ];
      addons.forEach(function(a){var cb=form.querySelector('[name="'+a[0]+'"]');if(cb&&cb.checked){chosen.push([a[1],a[2]]);}});
      var sum=chosen.reduce(function(v,a){return v+a[1];},0);
      var care=form.querySelector('[name="maintenance"]').checked?50:0;
      total.textContent=cad(sum);
      monthly.textContent=care?cad(care)+'/month optional maintenance':'No monthly maintenance selected';
      breakdown.replaceChildren();
      chosen.forEach(function(a){var li=document.createElement('li'),label=document.createElement('span'),value=document.createElement('strong');label.textContent=a[0];value.textContent=cad(a[1]);li.append(label,value);breakdown.appendChild(li);});
      var detail='Website type: '+(isOne?'One-page':'Multi-page')+'\nRequested pages: '+num+'\nOptional features: '+(chosen.length>1?chosen.slice(1).map(function(a){return a[0];}).join(', '):'None')+'\nOptional maintenance: '+(care?'$50 per month':'No')+'\nIndicative setup estimate: '+cad(sum)+' CAD before applicable tax. Subject to final scope and approval.';
      request.href='contact.html?estimate='+encodeURIComponent(detail);
    }
    form.addEventListener('input',calculate);form.addEventListener('change',calculate);calculate();
  }
  var details=(document.getElementById('project-details')||document.getElementById('details'));
  if(details){
    var params=new URLSearchParams(window.location.search);
    var estimate=params.get('estimate');
    if(estimate){
      details.value='I would like to discuss this online estimate:\n\n'+estimate.slice(0,1000)+'\n\nMy business and project requirements:\n';
      var websiteType=document.getElementById('website-type');
      if(websiteType){
        var selectedType=estimate.startsWith('Website type: Multi-page')?'Multi-page website':
          estimate.startsWith('Website type: One-page')?'One-page website':null;
        if(selectedType&&Array.from(websiteType.options).some(function(option){return option.value===selectedType;})){
          websiteType.value=selectedType;
        }
      }
    }
  }
})();
