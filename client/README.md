<h1 align="center">
  <br>
  <img src="./public/assets/nav_logo.png" alt="DigiBlock API" width="500">
  <br>
  DigiBlock
  <br>
</h1>

<h4 align="center">A one-stop platform for your Digital Identity to be Safe and Organized</h4>
<p align="center">
  <a href="#file-structure">File Structure</a> •
  <a href="#environment-configurations">Environment Configurations</a>
</p>

<p align="center">
<img src="../screenshots/homepage.png">
</p>

## File Structure

```
digiblock\
│
├── client\
│   ├── public\
│   │   ├── assets\
│   │   │   ├── birthCertificate.png
│   │   │   ├── correct.png
│   │   │   ├── deathCertificate.png
│   │   │   ├── delete.png
│   │   │   ├── error.svg
│   │   │   ├── hero.svg
│   │   │   ├── incorrect.png
│   │   │   ├── loading.gif
│   │   │   ├── metamask.png
│   │   │   ├── nav_logo.png
│   │   │   ├── partner.svg
│   │   │   ├── pdf.png
│   │   │   ├── voterID.png
│   │   │   └── XIICertificate.png
│   │   │
│   │   ├── apple-touch-icon.png
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src\
│   │   ├── api\
│   │   │   ├── Admin\
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── config\
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── Issuer\
│   │   │       └── index.js
│   │   │
│   │   │
│   │   ├── components\
│   │   │   ├── Admin\
│   │   │   │   ├── Dashboard\
│   │   │   │   │   ├── MainComponents\
│   │   │   │   │   │   ├── Admins\
│   │   │   │   │   │   │   └── AdminDetails.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── DashboardStats\
│   │   │   │   │   │   │   ├── Card.jsx
│   │   │   │   │   │   │   └── Stats.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── Issuers\
│   │   │   │   │   │   │   └── IssuerDetails.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── Profile\
│   │   │   │   │   │   │   └── Profile.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── UI\
│   │   │   │   │   │   │   ├── AddAdminDrawer.jsx
│   │   │   │   │   │   │   ├── AddIssuerDrawer.jsx
│   │   │   │   │   │   │   ├── MasterKeyModal.jsx
│   │   │   │   │   │   │   ├── Pagination.jsx
│   │   │   │   │   │   │   ├── Table.jsx
│   │   │   │   │   │   │   └── TagsInput.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   └── Utils\
│   │   │   │   │   │       └── Validations.js
│   │   │   │   │   │
│   │   │   │   │   │
│   │   │   │   │   ├── Navbar\
│   │   │   │   │   │   ├── NavAdmin.jsx
│   │   │   │   │   │   └── NavProfile.jsx
│   │   │   │   │   │
│   │   │   │   │   └── SideBar\
│   │   │   │   │       ├── CollapsedSideBar.jsx
│   │   │   │   │       ├── FullSideBar.jsx
│   │   │   │   │       └── SideBar.jsx
│   │   │   │   │
│   │   │   │   │
│   │   │   │   └── Login\
│   │   │   │       ├── ConnectWallet.jsx
│   │   │   │       ├── Login.jsx
│   │   │   │       └── LoginToDashboard.jsx
│   │   │   │
│   │   │   │
│   │   │   ├── Common\
│   │   │   │   ├── 404\
│   │   │   │   │   └── 404.jsx
│   │   │   │   │
│   │   │   │   ├── AboutUs\
│   │   │   │   │   ├── About.jsx
│   │   │   │   │   └── Profile.jsx
│   │   │   │   │
│   │   │   │   ├── HomePage\
│   │   │   │   │   ├── Documents\
│   │   │   │   │   │   ├── Card.jsx
│   │   │   │   │   │   └── Documents.jsx
│   │   │   │   │   │
│   │   │   │   │   ├── Explore\
│   │   │   │   │   │   └── Explore.jsx
│   │   │   │   │   │
│   │   │   │   │   ├── Hero\
│   │   │   │   │   │   └── Hero.jsx
│   │   │   │   │   │
│   │   │   │   │   └── Info\
│   │   │   │   │       └── Info.jsx
│   │   │   │   │
│   │   │   │   │
│   │   │   │   ├── Loading\
│   │   │   │   │   └── Loading.jsx
│   │   │   │   │
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── ScrollToTop.jsx
│   │   │   │
│   │   │   ├── Issuer\
│   │   │   │   ├── Dashboard\
│   │   │   │   │   ├── MainComponents\
│   │   │   │   │   │   ├── DashboardGuide\
│   │   │   │   │   │   │   └── IssuerGuide.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── Documents\
│   │   │   │   │   │   │   └── IssuerDocuments.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── IssueDocument\
│   │   │   │   │   │   │   ├── Dropzone.jsx
│   │   │   │   │   │   │   └── IssueDocument.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   └── Profile\
│   │   │   │   │   │       └── Profile.jsx
│   │   │   │   │   │
│   │   │   │   │   │
│   │   │   │   │   ├── Navbar\
│   │   │   │   │   │   ├── NavIssuer.jsx
│   │   │   │   │   │   └── NavProfile.jsx
│   │   │   │   │   │
│   │   │   │   │   ├── SideBar\
│   │   │   │   │   │   ├── CollapsedSideBar.jsx
│   │   │   │   │   │   ├── FullSideBar.jsx
│   │   │   │   │   │   └── SideBar.jsx
│   │   │   │   │   │
│   │   │   │   │   └── UI\
│   │   │   │   │       └── Pagination.jsx
│   │   │   │   │
│   │   │   │   │
│   │   │   │   └── Login\
│   │   │   │       ├── ConnectWallet.jsx
│   │   │   │       ├── Login.jsx
│   │   │   │       └── LoginToDashboard.jsx
│   │   │   │
│   │   │   │
│   │   │   ├── Requestor\
│   │   │   │   ├── Dashboard\
│   │   │   │   │   ├── MainComponents\
│   │   │   │   │   │   ├── AcceptedDocuments\
│   │   │   │   │   │   │   └── AcceptedDocuments.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── DashboardGuide\
│   │   │   │   │   │   │   └── RequestorGuide.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── PendingDocuments\
│   │   │   │   │   │   │   └── PendingDocuments.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── Profile\
│   │   │   │   │   │   │   └── RequestorProfile.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── RejectedDocuments\
│   │   │   │   │   │   │   └── RejectedDocuments.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── RequestDocuments\
│   │   │   │   │   │   │   └── RequestDocuments.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── RevokedDocuments\
│   │   │   │   │   │   │   └── RevokedDocuments.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── UI\
│   │   │   │   │   │   │   ├── Pagination.jsx
│   │   │   │   │   │   │   └── Table.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   └── Utils\
│   │   │   │   │   │       └── Validations.js
│   │   │   │   │   │
│   │   │   │   │   │
│   │   │   │   │   ├── Navbar\
│   │   │   │   │   │   ├── NavProfile.jsx
│   │   │   │   │   │   └── NavRequestor.jsx
│   │   │   │   │   │
│   │   │   │   │   └── SideBar\
│   │   │   │   │       ├── CollapsedSideBar.jsx
│   │   │   │   │       ├── FullSideBar.jsx
│   │   │   │   │       └── SideBar.jsx
│   │   │   │   │
│   │   │   │   │
│   │   │   │   ├── Login\
│   │   │   │   │   ├── ConnectWallet.jsx
│   │   │   │   │   └── Login.jsx
│   │   │   │   │
│   │   │   │   └── SignUp\
│   │   │   │       ├── ConnectWallet.jsx
│   │   │   │       ├── SignUp.jsx
│   │   │   │       └── SignUpRequestor.jsx
│   │   │   │
│   │   │   │
│   │   │   └── User\
│   │   │       ├── Dashboard\
│   │   │       │   ├── MainComponents\
│   │   │       │   │   ├── AccessGranted\
│   │   │       │   │   │   └── AccessGranted.jsx
│   │   │       │   │   │
│   │   │       │   │   ├── AccessRejected\
│   │   │       │   │   │   └── AccessRejected.jsx
│   │   │       │   │   │
│   │   │       │   │   ├── AccessRevoked\
│   │   │       │   │   │   └── AccessRevoked.jsx
│   │   │       │   │   │
│   │   │       │   │   ├── DashboardGuide\
│   │   │       │   │   │   └── UserGuide.jsx
│   │   │       │   │   │
│   │   │       │   │   ├── Documents\
│   │   │       │   │   │   └── UserDocuments.jsx
│   │   │       │   │   │
│   │   │       │   │   ├── PendingApproval\
│   │   │       │   │   │   └── PendingApproval.jsx
│   │   │       │   │   │
│   │   │       │   │   ├── Profile\
│   │   │       │   │   │   └── Profile.jsx
│   │   │       │   │   │
│   │   │       │   │   ├── UI\
│   │   │       │   │   │   └── Pagination.jsx
│   │   │       │   │   │
│   │   │       │   │   └── Utils\
│   │   │       │   │       ├── ManageRequest.js
│   │   │       │   │       └── Validations.js
│   │   │       │   │
│   │   │       │   │
│   │   │       │   ├── Navbar\
│   │   │       │   │   ├── NavProfile.jsx
│   │   │       │   │   └── NavUser.jsx
│   │   │       │   │
│   │   │       │   └── SideBar\
│   │   │       │       ├── CollapsedSideBar.jsx
│   │   │       │       ├── FullSideBar.jsx
│   │   │       │       └── SideBar.jsx
│   │   │       │
│   │   │       │
│   │   │       ├── Login\
│   │   │       │   ├── ConnectWallet.jsx
│   │   │       │   └── Login.jsx
│   │   │       │
│   │   │       └── SignUp\
│   │   │           ├── ConnectWallet.jsx
│   │   │           ├── SignUp.jsx
│   │   │           └── SignUpUser.jsx
│   │   │
│   │   │
│   │   │
│   │   ├── config\
│   │   │   └── index.js
│   │   │
│   │   ├── contracts\
│   │   │   └── DigiBlock.json
│   │   │
│   │   ├── fonts\
│   │   │   └── Mogena.ttf
│   │   │
│   │   ├── hooks\
│   │   │   ├── useAdminDetect.js
│   │   │   ├── useIssuerDetect.js
│   │   │   ├── useRequestorDetect.js
│   │   │   └── useUserDetect.js
│   │   │
│   │   ├── pages\
│   │   │   ├── Admin\
│   │   │   │   ├── Dashboard\
│   │   │   │   │   └── AdminDashboard.jsx
│   │   │   │   │
│   │   │   │   └── Login\
│   │   │   │       └── AdminLogin.jsx
│   │   │   │
│   │   │   │
│   │   │   ├── Common\
│   │   │   │   ├── AboutUsPage.jsx
│   │   │   │   └── HomePage.jsx
│   │   │   │
│   │   │   ├── Issuer\
│   │   │   │   ├── Dashboard\
│   │   │   │   │   └── IssuerDashboard.jsx
│   │   │   │   │
│   │   │   │   └── Login\
│   │   │   │       └── IssuerLogin.jsx
│   │   │   │
│   │   │   │
│   │   │   ├── Requestor\
│   │   │   │   ├── Dashboard\
│   │   │   │   │   └── RequestorDashboard.jsx
│   │   │   │   │
│   │   │   │   └── Login\
│   │   │   │       ├── RequestorLogin.jsx
│   │   │   │       └── RequestorSignUp.jsx
│   │   │   │
│   │   │   │
│   │   │   └── User\
│   │   │       ├── Dashboard\
│   │   │       │   └── UserDashboard.jsx
│   │   │       │
│   │   │       └── Login\
│   │   │           ├── UserLogin.jsx
│   │   │           └── UserSignUp.jsx
│   │   │
│   │   │
│   │   │
│   │   ├── redux\
│   │   │   ├── admin\
│   │   │   │   ├── admin.actions.js
│   │   │   │   ├── admin.reducer.js
│   │   │   │   └── admin.types.js
│   │   │   │
│   │   │   ├── contract\
│   │   │   │   ├── contract.actions.js
│   │   │   │   ├── contract.reducer.js
│   │   │   │   ├── contract.saga.js
│   │   │   │   └── contract.types.js
│   │   │   │
│   │   │   ├── issuer\
│   │   │   │   ├── issuer.actions.js
│   │   │   │   ├── issuer.reducer.js
│   │   │   │   └── issuer.types.js
│   │   │   │
│   │   │   ├── requestor\
│   │   │   │   ├── requestor.actions.js
│   │   │   │   ├── requestor.reducer.js
│   │   │   │   └── requestor.types.js
│   │   │   │
│   │   │   ├── user\
│   │   │   │   ├── user.actions.js
│   │   │   │   ├── user.reducer.js
│   │   │   │   └── user.types.js
│   │   │   │
│   │   │   ├── root-reducer.js
│   │   │   ├── root-saga.js
│   │   │   └── store.js
│   │   │
│   │   ├── routes\
│   │   │   ├── AdminProtectedRoute.jsx
│   │   │   ├── IssuerProtectedRoute.jsx
│   │   │   ├── RequestorProtectedRoute.jsx
│   │   │   └── UserProtectedRoute.jsx
│   │   │
│   │   ├── UI\
│   │   │   └── NonDismissableModal.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── getWeb3.js
│   │   ├── index.css
│   │   └── index.jsx
│   │
│   ├── .env
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── craco.config.js
│   ├── gulpfile.js
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tailwind.config.js
│   └── yarn.lock
│
├── contracts\
│   └── DigiBlock.sol
│
├── migrations\
│   └── 1_deploy_digiblock.js
│
├── test\
│   ├── DigiBlock.js
│   └── TESTCOVERAGE.md
│
├── .gitattributes
├── .gitignore
├── CHANGELOG.md
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── truffle-config.js
```

## Environment Configurations

```
REACT_APP_API_BASE_URL = <REACT_APP_API_BASE_URL>
REACT_APP_BLOCKCHAIN_NETWORK_ID = <REACT_APP_BLOCKCHAIN_NETWORK_ID>
REACT_APP_BLOCKCHAIN_NETWORK_NAME = <REACT_APP_BLOCKCHAIN_NETWORK_NAME>
```
