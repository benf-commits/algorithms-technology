// Postcode to NSW state electorate lookup, and letter generation.
//
// Data is data/electorates.json, built by scripts/build_electorates.py in the
// planning repo from the QA'd school Facebook audit joined to the NSW schools
// master dataset. Member names and emails are extracted from each member's
// official profile page on parliament.nsw.gov.au, never constructed.
//
// The lookup answers "which state electorates contain the public schools in
// this postcode", not "which electorate does this person vote in". A postcode
// can span several electorates, so where it does the visitor picks.
(function () {
  'use strict';

  var DATA_URL = 'data/electorates.json';
  var ELECTORATE_FINDER = 'https://www.elections.nsw.gov.au/voting/electorate-and-candidate-search';

  var form = document.getElementById('postcode-form');
  if (!form) return;

  var input = document.getElementById('postcode-input');
  var status = document.getElementById('postcode-status');
  var picker = document.getElementById('electorate-picker');
  var result = document.getElementById('electorate-result');

  var data = null;
  var loading = null;

  function load() {
    if (data) return Promise.resolve(data);
    if (loading) return loading;
    loading = fetch(DATA_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (json) {
        data = json;
        return data;
      });
    return loading;
  }

  function fmt(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function say(message, isError) {
    status.textContent = message || '';
    status.style.color = isError ? '#f87171' : '';
  }

  function clear() {
    picker.innerHTML = '';
    picker.hidden = true;
    result.innerHTML = '';
    result.hidden = true;
  }

  // Letter text. Every figure comes from the loaded dataset and every quotation
  // is verbatim from the two source documents cited on the advisory page.
  function letterBody(name, info) {
    var schools = fmt(info.schools);
    var students = fmt(info.students);
    var plural = info.schools === 1 ? 'school' : 'schools';

    return [
      'Dear ' + info.member + ',',
      '',
      'I am writing as a constituent about NSW Department of Education policy PD-2011-0418, ' +
        'which requires school social media accounts to be public.',
      '',
      'On 28 July 2026 the eSafety Commissioner published an advisory, "Sharing school imagery ' +
        'in the age of AI: risks, deepfakes, and how to protect students and staff". It tells ' +
        'schools that "posting fewer images of school students and personnel - or none at all - ' +
        'can reduce the risk", and that a risk-based approach helps schools decide which images ' +
        'are "better shared in a closed or restricted space". Its pre-publication checklist asks ' +
        'schools to consider "Is the account public?" and "Do archived pages or past posts still ' +
        'need to remain public?"',
      '',
      'NSW Department of Education procedure PD-2011-0418-01 requires the opposite. Under the ' +
        'heading "Keep the school account open" it states that school accounts on public ' +
        'platforms "must not restrict access or be set as \'private\' or \'closed.\'"',
      '',
      'In ' + name + ', ' + schools + ' government ' + plural + ' serving ' + students +
        ' students operate public Facebook Pages under that policy. Across NSW the figure is ' +
        '1,713 schools and 596,069 students, in every one of the 93 state electorates.',
      '',
      'This is not a theoretical risk. eSafety reports that between January and March 2026 it ' +
        'received more than 100 reports about anonymous accounts targeting schools and school ' +
        'staff, and that almost all "involved imagery harvested from school social media ' +
        'accounts or websites". It also notes that where such material is not sexual, it "may ' +
        'fall outside the legal criteria" for removal, so eSafety may be unable to have it taken ' +
        'down at all. Prevention is the only control that works.',
      '',
      'I am asking you to raise three things with the Minister for Education and Early Learning:',
      '',
      '1. Issue guidance now confirming that AI scraping and deepfake generation is a risk that ' +
        'justifies restricting a school account. The policy already allows a school to restrict ' +
        'access "to manage or address any risks or issues", so this needs no policy change at ' +
        'all. What principals lack is a departmental statement that this risk qualifies.',
      '',
      '2. Amend the "Keep the school account open" clause so that restricted or closed settings ' +
        'are permitted, and are the default, for accounts that publish images of children.',
      '',
      '3. Rebuild the Permission to Publish consent form so that consent is granular by channel, ' +
        'discloses AI training, scraping and deepfake risk explicitly, and is renewed annually. ' +
        'The current form is a single binary choice, has no expiry, and does not mention any of ' +
        'these uses.',
      '',
      'None of these three changes requires legislation. The first requires nothing more than a ' +
        'memo. School Facebook accounts are already created by the department\'s social media ' +
        'team and centrally linked to the department\'s Business Manager, so the department can ' +
        'change the standard once rather than leaving 1,713 principals to work it out alone. ' +
        'eSafety itself says that "schools or school sectors can set common expectations and ' +
        'share practical guidance, reducing the need for each school to build its response from ' +
        'scratch."',
      '',
      'The full evidence, including the audit methodology and the figures for every electorate, ' +
        'is published at algorithms.technology.',
      '',
      'I would appreciate a response setting out what you will do.',
      '',
      'Yours sincerely,',
      '',
      '[your name]',
      '[your suburb and postcode]'
    ].join('\n');
  }

  function subject(name) {
    return 'School Facebook Pages in ' + name +
      ', and the eSafety advisory of 28 July 2026';
  }

  function render(name) {
    var info = data.electorates[name];
    if (!info) {
      say('No data for ' + name + '.', true);
      return;
    }

    var subj = subject(name);
    var body = letterBody(name, info);

    var contact;
    if (info.email) {
      contact =
        '<a class="btn btn--primary" id="letter-mailto" href="mailto:' + info.email +
        '?subject=' + encodeURIComponent(subj) +
        '&body=' + encodeURIComponent(body) + '">Open in your email app</a>' +
        '<a class="btn btn--outline" href="' + info.url +
        '" target="_blank" rel="noopener">' + info.member + '\'s contact page</a>';
    } else {
      // Kogarah publishes a contact form rather than an address. Never invent one.
      contact =
        '<a class="btn btn--primary" href="' + info.url +
        '" target="_blank" rel="noopener">' + info.member +
        '\'s contact page</a>';
    }

    var emailNote = info.email
      ? '<p class="text-muted" style="font-size: 0.85rem;">Sending to <strong>' + info.email +
        '</strong>, the electorate office address published on ' + info.member +
        '\'s official profile.</p>'
      : '<p class="text-muted" style="font-size: 0.85rem;">' + info.member +
        ' does not publish an electorate office email address. Use the contact form on their ' +
        'official profile page and paste the letter below.</p>';

    result.innerHTML =
      '<div class="callout callout--info">' +
        '<div class="callout__title">' + name + '</div>' +
        '<p><strong>' + info.member + '</strong> (' + info.party + ') is the Member for ' +
          name + ' in the NSW Legislative Assembly.</p>' +
        '<p>In this electorate, <strong>' + fmt(info.schools) + '</strong> government ' +
          (info.schools === 1 ? 'school' : 'schools') + ' serving <strong>' +
          fmt(info.students) + '</strong> students operate public Facebook Pages. ' +
          'Local government ' + (info.lgas.length === 1 ? 'area' : 'areas') + ': ' +
          info.lgas.join(', ') + '.</p>' +
      '</div>' +
      '<h3 class="mt-2xl">Your letter</h3>' +
      '<p class="text-muted">Edit it however you like. A letter in your own words carries ' +
        'more weight than a form letter, so changing even the first paragraph helps. Replace ' +
        'the two bracketed lines at the end before you send it.</p>' +
      emailNote +
      '<label for="letter-subject" class="mt-lg" style="display:block;font-weight:600;">Subject</label>' +
      '<input type="text" id="letter-subject" value="' +
        subj.replace(/"/g, '&quot;') + '" style="width:100%;">' +
      '<label for="letter-body" class="mt-lg" style="display:block;font-weight:600;">Letter</label>' +
      '<textarea id="letter-body" rows="26" style="width:100%;font-family:inherit;line-height:1.6;">' +
        body.replace(/</g, '&lt;') +
      '</textarea>' +
      '<div class="btn-group mt-lg">' + contact +
        '<button type="button" class="btn btn--outline" id="letter-copy">Copy the letter</button>' +
      '</div>' +
      '<div id="letter-copied" class="mt-sm text-muted" style="font-size:0.85rem;"></div>';

    result.hidden = false;

    // Keep the mailto in step with edits to the textarea.
    var bodyEl = document.getElementById('letter-body');
    var subjEl = document.getElementById('letter-subject');
    var mailto = document.getElementById('letter-mailto');

    function sync() {
      if (!mailto) return;
      mailto.href = 'mailto:' + info.email +
        '?subject=' + encodeURIComponent(subjEl.value) +
        '&body=' + encodeURIComponent(bodyEl.value);
    }
    bodyEl.addEventListener('input', sync);
    subjEl.addEventListener('input', sync);

    document.getElementById('letter-copy').addEventListener('click', function () {
      var note = document.getElementById('letter-copied');
      var text = subjEl.value + '\n\n' + bodyEl.value;
      var done = function () { note.textContent = 'Copied. Paste it into your email or the contact form.'; };
      var failed = function () { note.textContent = 'Could not copy automatically. Select the text and copy it.'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, failed);
      } else {
        bodyEl.select();
        failed();
      }
    });

    if (window.dataLayer) {
      window.dataLayer.push({ event: 'letter_generated', electorate: name });
    }

    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function offerChoice(postcode, names) {
    picker.innerHTML =
      '<p><strong>Postcode ' + postcode + '</strong> covers schools in ' + names.length +
      ' state electorates. Pick the one you want to write to.</p>' +
      '<p class="text-muted" style="font-size:0.85rem;">Not sure which one you vote in? ' +
      '<a href="' + ELECTORATE_FINDER + '" target="_blank" rel="noopener">Look up your ' +
      'electorate by address at the NSW Electoral Commission</a>.</p>' +
      '<div class="btn-group mt-lg">' +
      names.map(function (n) {
        var info = data.electorates[n];
        return '<button type="button" class="btn btn--outline" data-electorate="' + n + '">' +
          n + ' (' + info.schools + ' ' + (info.schools === 1 ? 'school' : 'schools') + ')</button>';
      }).join('') +
      '</div>';
    picker.hidden = false;

    picker.querySelectorAll('button[data-electorate]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        render(btn.getAttribute('data-electorate'));
      });
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clear();

    var postcode = (input.value || '').trim();
    if (!/^\d{4}$/.test(postcode)) {
      say('Enter a four digit Australian postcode.', true);
      return;
    }

    say('Looking that up...');

    load().then(function () {
      var names = data.postcodes[postcode];
      if (!names || !names.length) {
        say('');
        result.innerHTML =
          '<div class="callout callout--info">' +
          '<div class="callout__title">No NSW government school in postcode ' + postcode + '</div>' +
          '<p>The audit covers NSW government schools only, and 532 postcodes contain one. ' +
          'This postcode is not among them, which usually means it is outside NSW, or it has ' +
          'no government school, or its schools are all non-government.</p>' +
          '<p>You can still write to your local member. ' +
          '<a href="' + ELECTORATE_FINDER + '" target="_blank" rel="noopener">Find your NSW ' +
          'electorate by address</a>, or use the letter to the Minister below, which needs no ' +
          'postcode.</p>' +
          '</div>';
        result.hidden = false;
        return;
      }
      say('');
      if (names.length === 1) {
        render(names[0]);
      } else {
        offerChoice(postcode, names);
      }
    }).catch(function () {
      say('Could not load the electorate data. Reload the page, or email hello@algorithms.technology.', true);
    });
  });
})();
