const app = document.getElementById("app");
const toast = document.getElementById("toast");
const state = { user: null, selectedLevel: "Intermediate", selectedSubject: "English", page: "splash", history: [] };

const subjects = ["English","German","Arabic","French","Spanish"];
const levels = ["Beginner","Elementary","Intermediate","Advanced"];

function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function go(page, data={}){ state.history.push(state.page); state.page=page; Object.assign(state,data); render(); }
function back(){ state.page=state.history.pop() || "home"; render(); }
function notify(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800);}
function button(text, action="go('home')", cls="btn"){return `<button class="${cls}" onclick="${action}">${text}</button>`}
function top(title, backBtn=true){return `<div class="top">${backBtn?`<button class="back" onclick="back()">‹</button>`:`<span></span>`}<div class="title">${title}</div><span style="width:38px"></span></div>`}
function bottom(active="home"){return `<div class="bottom">
  <button class="nav-item ${active==="home"?"active":""}" onclick="go('home')"><span class="nav-icon">⌂</span>Home</button>
  <button class="nav-item ${active==="courses"?"active":""}" onclick="go('courses')"><span class="nav-icon">▣</span>Courses</button>
  <button class="nav-item ${active==="calendar"?"active":""}" onclick="go('calendar')"><span class="nav-icon">□</span>Calendar</button>
  <button class="nav-item ${active==="chat"?"active":""}" onclick="go('chat')"><span class="nav-icon">◌</span>Chat</button>
  <button class="nav-item ${active==="profile"?"active":""}" onclick="go('profile')"><span class="nav-icon">●</span>Profile</button>
</div>`}

function render(){
  const views = {
    splash, login, signup, forgot, verify, welcome, level, subject, home, courses, course, lesson, quiz, teachers,
    teacher, booking, payment, success, calendar, chat, profile, settings
  };
  app.innerHTML = `<div class="app-shell"><main class="phone">${(views[state.page]||home)()}</main></div>`;
}

function splash(){setTimeout(()=>{if(state.page==="splash")go("login",{})},1200);return `<section class="screen logo-screen"><div class="brand">Learnella</div></section>`}

function login(){return `<section class="screen">${top("Welcome back",false)}
  <p class="sub">Sign in to continue your learning journey.</p>
  <div class="field"><label>Email address</label><input id="email" type="email" placeholder="you@example.com"></div>
  <div class="field"><label>Password</label><input id="password" type="password" placeholder="••••••••"></div>
  <div style="text-align:right;margin:5px 0 20px"><a class="link" href="#" onclick="go('forgot')">Forgot password?</a></div>
  ${button("Login","loginAction()")}
  <div class="divider">OR</div><div class="socials"><button class="social" onclick="notify('Google sign in')">G Google</button><button class="social" onclick="notify('Apple sign in')"> Apple</button></div>
  <p class="center sub" style="margin-top:24px">Don't have an account? <a class="link" href="#" onclick="go('signup')">Sign up</a></p>
</section>`}

function loginAction(){state.user={name:"Alex",email:document.getElementById("email").value||"alex@example.com"};go("welcome")}
function signup(){return `<section class="screen">${top("Create account",false)}
  <p class="sub">Create your account and start learning.</p>
  <div class="field"><label>Full name</label><input placeholder="Your name"></div>
  <div class="field"><label>Email address</label><input type="email" placeholder="you@example.com"></div>
  <div class="field"><label>Password</label><input type="password" placeholder="Create a password"></div>
  ${button("Create account","go('verify')")}<div class="divider">OR</div>
  <div class="socials"><button class="social">G Google</button><button class="social"> Apple</button></div>
  <p class="center sub" style="margin-top:24px">Already have an account? <a class="link" onclick="go('login')">Login</a></p>
</section>`}
function forgot(){return `<section class="screen">${top("Forgot password?")}<p class="sub">Enter your email and we will send you a verification code.</p><div class="field"><label>Email address</label><input type="email" placeholder="you@example.com"></div>${button("Send code","go('verify')")}</section>`}
function verify(){return `<section class="screen">${top("Verification")}<div class="center"><div style="font-size:45px;margin:20px">✉</div><h2>Check your email</h2><p class="sub">Enter the 4-digit code we sent to your email.</p></div><div class="otp">${[1,2,3,4].map(i=>`<input maxlength="1" inputmode="numeric">`).join("")}</div>${button("Verify","go('welcome')")}<p class="center sub" style="margin-top:18px">Didn't receive it? <a class="link" onclick="notify('Code resent')">Resend code</a></p></section>`}

function welcome(){return `<section class="screen">${top("Let's get started",false)}<div class="center" style="padding:35px 0 20px"><div style="font-size:75px">📚</div><h2>Welcome to Learnella</h2><p class="sub">Choose your level and favorite subjects so we can personalize your learning plan.</p></div>${button("Continue","go('level')")}</section>`}

function level(){return `<section class="screen">${top("Select your level")}<p class="sub">Choose the level that best matches your current skills.</p><div class="choice-list">${levels.map((x,i)=>`<button class="choice ${state.selectedLevel===x?"active":""}" onclick="state.selectedLevel='${x}';render()"><div class="icon">${i+1}</div><div class="grow"><b>${x}</b><div class="muted">${["I am just starting","I know the basics","I can communicate","I am highly confident"][i]}</div></div><span class="check"></span></button>`).join("")}</div>${button("Continue","go('subject')")}</section>`}
function subject(){return `<section class="screen">${top("Select your subject")}<p class="sub">Pick one or more subjects to personalize your dashboard.</p><div class="choice-list">${subjects.map((x,i)=>`<button class="choice ${state.selectedSubject===x?"active":""}" onclick="state.selectedSubject='${x}';render()"><div class="icon">${["A","DE","ع","FR","ES"][i]}</div><div class="grow"><b>${x}</b><div class="muted">Lessons, practice & live classes</div></div><span class="check"></span></button>`).join("")}</div>${button("Finish setup","go('home')")}</section>`}

function home(){return `<section class="screen">${bottom("home")}
  <div class="top"><div><div class="sub">Good morning</div><div class="title">${esc(state.user?.name||"Alex")} 👋</div></div><button class="back" onclick="go('profile')">●</button></div>
  <div class="hero"><h2>Keep learning!</h2><p>You're on a 5 day streak. Complete one lesson today to keep it going.</p><div style="margin-top:15px">${button("Continue learning","go('lesson')","btn light")}</div></div>
  <div class="stats"><div class="stat"><b>1,240</b><span>XP points</span></div><div class="stat"><b>5</b><span>Day streak</span></div><div class="stat"><b>18</b><span>Lessons</span></div></div>
  <div class="section-head"><h3>My courses</h3><a class="link" onclick="go('courses')">See all</a></div>
  <div class="course-grid">${courseCard("English","A2 • 68%","🇬🇧",68)}${courseCard("German","A1 • 42%","🇩🇪",42)}${courseCard("Arabic","A1 • 25%","ع",25)}${courseCard("French","A1 • 15%","🇫🇷",15)}</div>
</section>`}
function courseCard(name,sub,icon,p){return `<button class="course" onclick="go('course',{courseName:'${name}'})"><div class="course-img">${icon}</div><h4>${name}</h4><p>${sub}</p><div class="progress"><i style="width:${p}%"></i></div></button>`}

function courses(){return `<section class="screen">${bottom("courses")}${top("My courses",false)}<input class="search" placeholder="Search courses..." oninput="filterCourses(this.value)"><div id="course-list">${["English","German","Arabic","French","Spanish","Programming"].map((x,i)=>`<div class="list-card course-row" data-name="${x.toLowerCase()}"><div class="row"><div class="lesson-icon">${["🇬🇧","🇩🇪","ع","🇫🇷","🇪🇸","</>"][i]}</div><div class="grow"><b>${x}</b><div class="muted">${levels[i%4]} • ${20+i*6} lessons</div></div><span class="pill">${20+i*10}%</span></div></div>`).join("")}</div></section>`}
function filterCourses(v){document.querySelectorAll(".course-row").forEach(e=>e.style.display=e.dataset.name.includes(v.toLowerCase())?"block":"none")}

function course(){let n=state.courseName||"English";return `<section class="screen">${bottom("courses")}${top(n)}<div class="hero"><h2>${n} course</h2><p>Personalized lessons for ${state.selectedLevel} learners.</p></div><div class="section-head"><h3>Course progress</h3><b>68%</b></div><div class="progress" style="height:8px"><i style="width:68%"></i></div><div class="section-head"><h3>Lessons</h3><span class="muted">18 / 26</span></div>${["Introduction & greetings","Everyday vocabulary","Listening practice","Grammar basics","Speaking challenge","Final review"].map((x,i)=>`<button class="lesson" onclick="go('lesson',{lessonName:'${x}'})"><div class="lesson-icon">${i<3?"✓":"→"}</div><div class="grow"><b>${x}</b><p>${8+i*5} min • ${i<3?"Completed":"New lesson"}</p></div><span class="pill">${i<3?"Done":"Start"}</span></button>`).join("")}</section>`}

function lesson(){let n=state.lessonName||"Everyday vocabulary";return `<section class="screen">${top("Lesson")}<div class="center"><span class="pill">Lesson 4 of 12</span><h2>${n}</h2><p class="sub">Practice today's vocabulary and improve your confidence.</p></div><div class="list-card center" style="padding:25px;margin-top:20px"><div style="font-size:50px">🌎</div><h3>What does “beautiful” mean?</h3><p class="sub">Choose the correct translation.</p></div><div class="choice-list">${["Schön","Schnell","Klein","Neu"].map((x,i)=>`<button class="choice" onclick="notify(${i===0?"'Correct! +20 XP'":"'Try again'"})"><div class="icon">${String.fromCharCode(65+i)}</div><div class="grow"><b>${x}</b></div></button>`).join("")}</div>${button("Continue","go('quiz')")}</section>`}

function quiz(){return `<section class="screen">${top("Quick quiz")}<div class="row" style="justify-content:space-between"><span class="pill">Question 3 / 10</span><b>❤️ 4</b></div><div class="ring" style="width:90px;height:90px;margin:25px auto">30s</div><h2>Choose the best answer</h2><p class="sub">I usually ___ coffee in the morning.</p><div class="choice-list">${["drink","drinks","drinking","drank"].map((x,i)=>`<button class="choice" onclick="notify(${i===0?"'Correct!'":"'Incorrect'"})"><div class="icon">${i+1}</div><div class="grow"><b>${x}</b></div></button>`).join("")}</div>${button("Next question","notify('Next question')")}</section>`}

function teachers(){return `<section class="screen">${bottom("courses")}${top("Top teachers",false)}<p class="sub">Find a teacher for your next live lesson.</p>${["Emma Wilson","Daniel Miller","Sophia Brown","James Smith"].map((n,i)=>`<button class="teacher" onclick="go('teacher',{teacherName:'${n}'})"><div class="avatar">${["👩🏻","👨🏻","👩🏼","👨🏼"][i]}</div><div class="grow"><b>${n}</b><p>${subjects[i%subjects.length]} teacher • 4.${7+i}</p><span class="rating">★★★★★</span></div><b class="price">$${18+i*5}/h</b></button>`).join("")}</section>`}
function teacher(){let n=state.teacherName||"Emma Wilson";return `<section class="screen">${top("Teacher profile")}<div class="profile"><div class="avatar">👩🏻</div><div class="grow"><h2 style="margin:0">${n}</h2><div class="rating">★★★★★ 4.9</div><p class="muted">Professional language teacher</p></div></div><div class="list-card"><b>About me</b><p class="sub">I help learners build confidence through practical conversation, vocabulary and personalized feedback.</p></div><div class="section-head"><h3>Choose a date</h3></div>${calendarMini()}${button("Book a lesson","go('booking')")}</section>`}
function calendarMini(){return `<div class="calendar">${["M","T","W","T","F","S","S",1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((x,i)=>`<div class="day ${i===10?"active":""}">${x}</div>`).join("")}</div>`}
function booking(){return `<section class="screen">${top("Booking")}<div class="list-card"><div class="row"><div class="avatar">👩🏻</div><div class="grow"><b>${esc(state.teacherName||"Emma Wilson")}</b><p class="muted">English • 50 minutes</p></div><span class="price">$25</span></div></div><h3>Select time</h3><div class="choice-list">${["09:00 AM","11:30 AM","02:00 PM","05:30 PM"].map((x,i)=>`<button class="choice ${i===2?"active":""}" onclick="notify('${x} selected')"><div class="grow"><b>${x}</b><div class="muted">Available</div></div><span class="check"></span></button>`).join("")}</div>${button("Continue to payment","go('payment')")}</section>`}
function payment(){return `<section class="screen">${top("Payment")}<div class="payment-card"><div class="visa">VISA</div><div style="margin-top:52px;letter-spacing:2px">•••• •••• •••• 4821</div><div class="row" style="justify-content:space-between;margin-top:12px;font-size:9px"><span>ALEX</span><span>12/28</span></div></div><div class="field"><label>Cardholder name</label><input value="Alex Morgan"></div><div class="field"><label>Card number</label><input value="4242 4242 4242 4242"></div><div class="row"><div class="field grow"><label>Expiry</label><input value="12/28"></div><div class="field grow"><label>CVV</label><input value="123"></div></div>${button("Pay $25","go('success')")}</section>`}
function success(){return `<section class="screen success">${top("Payment complete",false)}<div class="success-circle">✓</div><h2>Congratulations!</h2><p class="sub">Your lesson has been successfully booked.</p><div class="list-card" style="width:100%;text-align:left;margin:25px 0"><div class="row"><div class="lesson-icon">📅</div><div class="grow"><b>English lesson</b><p class="muted">${esc(state.teacherName||"Emma Wilson")} • Tomorrow, 2:00 PM</p></div></div></div>${button("Back to home","go('home')")}</section>`}

function calendar(){return `<section class="screen">${bottom("calendar")}${top("Calendar",false)}<div class="calendar">${["M","T","W","T","F","S","S",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((x,i)=>`<div class="day ${[10,17,24].includes(i)?"active":""}">${x}</div>`).join("")}</div><div class="section-head"><h3>Upcoming</h3></div>${["English with Emma • 2:00 PM","German practice • 5:30 PM","Vocabulary review • 7:00 PM"].map((x,i)=>`<div class="lesson"><div class="lesson-icon">📅</div><div class="grow"><b>${x}</b><p>Online • ${i+1} hour</p></div><span class="pill">Soon</span></div>`).join("")}</section>`}
function chat(){return `<section class="screen">${bottom("chat")}${top("Chat",false)}<div class="chat" style="margin-top:25px">${`<div class="bubble in">Hi Alex! Ready for today's lesson?</div><div class="bubble out">Yes! I want to practice speaking.</div><div class="bubble in">Perfect. Let's start with a quick warm-up.</div><div class="bubble out">Sounds good 😊</div>`}</div><div style="position:absolute;bottom:82px;left:22px;right:22px;display:flex;gap:8px"><input class="search" style="margin:0;flex:1" placeholder="Type a message..."><button class="btn small" onclick="notify('Message sent')">Send</button></div></section>`}
function profile(){return `<section class="screen">${bottom("profile")}${top("Profile",false)}<div class="profile"><div class="avatar">👨🏻</div><div><h2 style="margin:0">Alex Morgan</h2><p class="muted">alex@example.com</p></div></div><div class="stats"><div class="stat"><b>1,240</b><span>XP</span></div><div class="stat"><b>5</b><span>Streak</span></div><div class="stat"><b>18</b><span>Lessons</span></div></div>${["My courses","Achievements","Payment methods","Notifications","Settings"].map((x,i)=>`<button class="choice" onclick="go('${i===4?"settings":i===0?"courses":"profile"}')"><div class="icon">${["▣","★","▤","◉","⚙"][i]}</div><div class="grow"><b>${x}</b><div class="muted">Manage your ${x.toLowerCase()}</div></div>›</button>`).join("")}</section>`}
function settings(){return `<section class="screen">${top("Settings")}<div class="list-card"><div class="row"><div class="grow"><b>Language</b><p class="muted">English</p></div><span>›</span></div></div><div class="list-card"><div class="row"><div class="grow"><b>Dark mode</b><p class="muted">Appearance</p></div><button class="btn small light" onclick="document.body.classList.toggle('dark')">Toggle</button></div></div><div class="list-card"><div class="row"><div class="grow"><b>Account</b><p class="muted">Password & privacy</p></div><span>›</span></div></div>${button("Log out","go('login')","btn light")}</section>`}

render();
