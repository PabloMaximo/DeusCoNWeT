/*!CK:1857293365!*//*1427214107,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["sP0Sg"]); }

__d("AdsAccountManageServerConstants",[],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();e.exports={ACTIONS:{ADD_APP_MANAGES_ACCOUNT:"add_acct",INIT_SESSION:"init",REMOVE_APP_MANAGES_ACCOUNT:"remove_acct"},PARAMS:{APP_ID:"app_id",ACTION:"action",ACCOUNT_IDS:"account_ids"},FIELDS:{ACCOUNT_IDS:"account_ids",NUM_MAX_ACCOUNTS:"max_accounts",APP_TIER:"app_tier"}};},null);
__d("AdsAccountManageDispatcher",["merge","Dispatcher","AdsPayloadSource","copyProperties"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();'use strict';function k(m){return function(n,o){var p=g({source:m,action:n},o);this.dispatch(p);};}var l=j(new h(),{handleUpdateFromServer:k(i.SERVER_RESPONSE),handleUpdateFromView:k(i.VIEW_ACTION)});e.exports=l;},null);
__d("XDeveloperAdsAccountManageAsyncController",["XController"],function(a,b,c,d,e,f){b.__markCompiled&&b.__markCompiled();e.exports=b("XController").create("\/apps\/{app_id}\/async\/settings\/ads-api\/",{app_id:{type:"Int",required:true}});},null);
__d("AdsAccountManageActions",["AsyncRequest","AdsAccountManageServerConstants","AdsAccountManageDispatcher","XDeveloperAdsAccountManageAsyncController"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();var k=h.ACTIONS,l=h.PARAMS,m={initSession:function(n){var o=j.getURIBuilder().setInt(l.APP_ID,n).getURI(),p={};p[l.ACTION]=k.INIT_SESSION;new g().setData(p).setMethod('POST').setURI(o).setHandler(function(q){i.handleUpdateFromServer(k.INIT_SESSION,q.getPayload());}).send();},removeAccountsManagedByApp:function(n,o){var p=j.getURIBuilder().setInt(l.APP_ID,n).getURI(),q={};q[l.ACTION]=k.REMOVE_APP_MANAGES_ACCOUNT;q[l.ACCOUNT_IDS]=o;new g().setData(q).setMethod('POST').setURI(p).setHandler(function(r){i.handleUpdateFromServer(k.REMOVE_APP_MANAGES_ACCOUNT,r.getPayload());}).send();},addAccountsManagedByApp:function(n,o){var p=j.getURIBuilder().setInt(l.APP_ID,n).getURI(),q={};q[l.ACTION]=k.ADD_APP_MANAGES_ACCOUNT;q[l.ACCOUNT_IDS]=o;new g().setData(q).setMethod('POST').setURI(p).setHandler(function(r){i.handleUpdateFromServer(k.ADD_APP_MANAGES_ACCOUNT,r.getPayload());}).send();}};e.exports=m;},null);
__d("AdsAccountManageStore",["AdsAccountManageDispatcher","AdsBaseStore","AdsPayloadSource","AdsAccountManageServerConstants","AdsAPIAdAccountFields"],function(a,b,c,d,e,f,g,h,i,j,k){b.__markCompiled&&b.__markCompiled();var l=j.FIELDS,m=j.ACTIONS;for(var n in h)if(h.hasOwnProperty(n))p[n]=h[n];var o=h===null?null:h.prototype;p.prototype=Object.create(o);p.prototype.constructor=p;p.__superConstructor__=h;function p(){"use strict";h.call(this);this.managedAdAccounts={};this.maxAdAccounts=null;this.appTier="";g.register(this.onDispatch.bind(this));}p.prototype.getStoreName=function(){"use strict";return 'AdsAccountManageStore';};p.prototype.onDispatch=function(r){"use strict";switch(r.source){case i.SERVER_RESPONSE:this.$AdsAccountManageStoreClass0(r);break;}};p.prototype.$AdsAccountManageStoreClass0=function(r){"use strict";switch(r.action){case (m.INIT_SESSION):this.maxAdAccounts=r[l.NUM_MAX_ACCOUNTS];this.managedAdAccounts=this.$AdsAccountManageStoreClass1(r[l.ACCOUNT_IDS]);this.appTier=r[l.APP_TIER];this.inform('change');break;case (m.REMOVE_APP_MANAGES_ACCOUNT):case (m.ADD_APP_MANAGES_ACCOUNT):this.managedAdAccounts=this.$AdsAccountManageStoreClass1(r[l.ACCOUNT_IDS]);this.inform('change');break;}};p.prototype.$AdsAccountManageStoreClass1=function(r){"use strict";var s={};for(var t=r.length-1;t>=0;t--){var u=r[t],v={};v[k.ACCOUNT_ID]=u;s[u]=v;}return s;};p.prototype.getMaxAccounts=function(){"use strict";return this.maxAdAccounts;};p.prototype.getAdAccountsManagedByApp=function(){"use strict";return this.managedAdAccounts;};p.prototype.getAppTier=function(){"use strict";return this.appTier;};var q=new p();e.exports=q;},null);
__d("AdsAccountManageTable.react",["cx","React","StrSet","XUICheckboxInput.react"],function(a,b,c,d,e,f,g,h,i,j){b.__markCompiled&&b.__markCompiled();var k=h,l=k.PropTypes,m=h.createClass({displayName:"AdsAccountManageTable",propTypes:{accounts:l.array.isRequired,onCheckboxToggle:l.func.isRequired,onHeaderClick:l.func.isRequired,orderedColumns:l.array.isRequired,selectedAccounts:l.instanceOf(i),sortColumn:l.string.isRequired,viewLength:l.number.isRequired,viewStart:l.number.isRequired},_renderContentRow:function(n,o){var p=n.masterKey,q=this.props.orderedColumns.map(function(u){return n[u];}),r=this.props.selectedAccounts.contains(p),s=(("_2nw4")+(r?' '+"_2nw5":'')),t=this.props.onCheckboxToggle.bind(null,p);return (h.createElement("tr",{className:s,key:'tr_'+p},h.createElement("td",{key:"td_cb_"+p,width:'18px'},h.createElement(j,{checked:r?'checked':null,onChange:t})),q.map(this._renderCell)));},_renderFillerRows:function(n){if(n<=0)return null;var o=[];for(var p=n-1;p>=0;p--)o[p]='fillerRow'+p;var q=function(s,t){return h.createElement("td",{key:"fc"+t});},r=function(s){return (h.createElement("tr",{key:s},h.createElement("td",{key:"cb"+s,width:'18px'}),this.props.orderedColumns.map(q)));};return o.map(r,this);},_renderCell:function(n,o){return (h.createElement("td",{key:'cell_'+o+'_accountField'},n));},_renderHeaderCell:function(n){var o="_2nw6";return (h.createElement("th",{className:o,key:"th_"+n,onClick:this.props.onHeaderClick.bind(null,n)},"Account ID"));},render:function(){var n=Math.max(this.props.viewLength-this.props.accounts.length,0),o=this.props.viewLength*40,p="_2nw7";return (h.createElement("table",{className:p},h.createElement("thead",null,h.createElement("th",{key:"headerCheckbox"}),this.props.orderedColumns.map(this._renderHeaderCell)),h.createElement("tbody",{height:o.toString()+"px"},this.props.accounts.map(this._renderContentRow),this._renderFillerRows(n))));}});e.exports=m;},null);
__d("AdsAccountManageContainer.react",["AdsAccountManageActions","AdsAccountManageStore","AdsAccountManageTable.react","AdsAPIAdAccountFields","LeftRight.react","React","StrSet","XUIButton.react","XUITextInput.react","cx","merge","Keys","underscore.ads"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){b.__markCompiled&&b.__markCompiled();var t=l,u=t.PropTypes,v=l.createClass({displayName:"AdsAccountManageContainer",propTypes:{appID:u.number.isRequired},componentWillMount:function(){this._subscription=h.subscribe('change',this.handleStoreUpdate);this.fetchInit();},componentWillUnmount:function(){h.unsubscribe(this._subscription);},getInitialState:function(){var x=h.getAdAccountsManagedByApp();return ({doReverseSort:false,fieldToSortBy:j.NAME,managedAdAccounts:x,selectedAccounts:new m()});},_compareAlphaNumeric:function(x){return function(y,z,aa){return (y[z][x]>y[aa][x]?1:-1);};},_getSortedAccountsKeys:function(x,y,z){var aa=z?1:-1;return Object.keys(x).sort(function(ba,ca){return y(x,ba,ca)*aa;});},onAddIDTextChange:function(event){this.setState({addIDTextValue:event.target.value});},fetchInit:function(){g.initSession(this.props.appID);},handleAccountSubmit:function(){if(this.state.addIDTextValue){g.addAccountsManagedByApp(this.props.appID,[this.state.addIDTextValue]);this.setState({addIDTextValue:''});}},handleRemoveSelected:function(){if(this.state.selectedAccounts.count()!==0){g.removeAccountsManagedByApp(this.props.appID,this.state.selectedAccounts.toArray());this.setState({selectedAccounts:new m()});}},handleTableSortAction:function(x){this.setState({doReverseSort:(x===this.state.fieldToSortBy)&&!this.state.doReverseSort,fieldToSortBy:x});},handleStoreUpdate:function(){var x=h.getAdAccountsManagedByApp(),y=!!this.state.selectedAccounts?h.getMaxAccounts():this.state.selectedAccounts,z=h.getAppTier();this.setState({managedAdAccounts:x,maxAdAccounts:y,appTier:z,selectedAccounts:this.state.selectedAccounts.intersect(new m(x.keys))});},handleAccountSelection:function(x){var y=this.state.selectedAccounts;if(y.contains(x)){y=y.remove(x);}else y=y.add(x);this.setState({selectedAccounts:y});},render:function(){var x=this._getSortedAccountsKeys(this.state.managedAdAccounts,this._compareAlphaNumeric(this.state.fieldToSortBy),this.state.doReverseSort);if(!this.state.maxAdAccounts){var y=true,z="Loading...";}else if(x.length>=this.state.maxAdAccounts){y=true;z="At Maximum Allowed";}else{y=false;z="Account ID";}var aa=x.map(function(ba){return q({masterKey:ba},this.state.managedAdAccounts[ba]);},this);return (l.createElement("div",null,l.createElement(k,{className:"_3-8n"},l.createElement("div",null,"Add and Remove Ad Accounts"),l.createElement("div",null,l.createElement(w,{disabled:y,onChange:this.onAddIDTextChange,placeholder:z,value:this.state.addIDTextValue}),l.createElement(n,{label:"Add",disabled:y,onClick:this.handleAccountSubmit,use:"special"}),l.createElement(n,{label:"Remove",onClick:this.handleRemoveSelected,type:"button"}))),l.createElement(k,{className:"_3-8n"},l.createElement("div",null,"Ads API access level : ",this.state.appTier," "),l.createElement("div",null,"Maximum number of managed accounts : ",this.state.maxAdAccounts)),l.createElement(i,{accounts:aa,onCheckboxToggle:this.handleAccountSelection,onHeaderClick:this.handleTableSortAction,orderedColumns:[j.ACCOUNT_ID],selectedAccounts:this.state.selectedAccounts,sortColumn:this.state.fieldToSortBy,viewLength:10,viewStart:0})));}}),w=l.createClass({displayName:"PositiveIntegerInput",render:function(){return (l.createElement(o,{onChange:this.props.onChange,onKeyDown:this._onKeyDown,onPaste:this._onPaste,placeholder:this.props.placeholder,value:this.props.value}));},DIGIT_REGEX:/\d/,NUMBER_REGEX:/^\s*\d*\s*$/,_onKeyDown:function(event){if(event.ctrlKey||event.metaKey||event.altKey||this.KEYS_TO_IGNORE[event.which])return;var x=event.which,y=this.KEY_TO_CHAR_MAPPING[x];if(y)x=y.charCode;if(!this.DIGIT_REGEX.test(String.fromCharCode(x)))event.preventDefault();},_onPaste:function(event){if(event&&event.clipboardData&&event.clipboardData.getData){var x=event.clipboardData.getData('text/plain');return this.NUMBER_REGEX.test(x);}},KEYS_TO_IGNORE:s.indexBy([r.BACKSPACE,r.DELETE,r.DOWN,r.LEFT,r.RETURN,r.RIGHT,r.TAB,r.UP]),KEY_TO_CHAR_MAPPING:s.indexBy([{keyCode:96,charCode:48,char:'0'},{keyCode:97,charCode:49,char:'1'},{keyCode:98,charCode:50,char:'2'},{keyCode:99,charCode:51,char:'3'},{keyCode:100,charCode:52,char:'4'},{keyCode:101,charCode:53,char:'5'},{keyCode:102,charCode:54,char:'6'},{keyCode:103,charCode:55,char:'7'},{keyCode:104,charCode:56,char:'8'},{keyCode:105,charCode:57,char:'9'},{keyCode:110,charCode:46,char:'.'},{keyCode:188,charCode:44,char:','},{keyCode:190,charCode:46,char:'.'}],'keyCode')});e.exports=v;},null);
__d("AdsAccountManageDialog.react",["ix","LayerFadeOnHide","ReactLayeredComponentMixin","React","AdsAccountManageContainer.react","Image.react","XUIButton.react","XUIDialog.react","XUIDialogBody.react","XUIDialogButton.react","XUIDialogFooter.react","XUIDialogTitle.react"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){b.__markCompiled&&b.__markCompiled();var s=j,t=s.PropTypes,u=j.createClass({displayName:"AdsAccountManageDialog",mixins:[i],propTypes:{width:t.number.isRequired,appID:t.number.isRequired},getInitialState:function(){return {shown:false};},_onButtonClick:function(){this.setState({dialogShown:true});},renderLayers:function(){if(!this.state.dialogShown)return {};return {dialog:j.createElement(n,{layerHideOnBlur:false,shown:true,title:"API AdAccounts",width:this.props.width,behaviors:{LayerFadeOnHide:h}},j.createElement(r,null,j.createElement("span",null,"Ads API Account Configuration")),j.createElement(o,{useCustomPadding:false},j.createElement(k,{appID:this.props.appID})),j.createElement(q,null,j.createElement(p,{action:"cancel",label:"Done",use:"confirm"})))};},render:function(){return (j.createElement(m,{image:j.createElement(l,{src:g('/images/ui/x/image/gear.png')}),label:"Ads API",onClick:this._onButtonClick,type:"button"}));}});u.initDialogButton=function(v,w){j.render(j.createElement(u,{appID:w,width:640}),v);};e.exports=u;},null);