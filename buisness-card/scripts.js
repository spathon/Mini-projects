


var card          = document.querySelector('.business-card'),
    docFrag       = document.createDocumentFragment(),
    words         = 'Patrik Spathon\n\n- Web developer\n- Nodejs, PHP, HTML5, CSS3',
    chars_length  = words.length,
    binary_total  = '',
    i             = 0;




for (i=0; i < chars_length; i++) {
  var binary = words[i].charCodeAt(0).toString(2);
  binary = ("00000000" + binary).slice(-8);

  for (var j = 0; j < binary.length; j++) {
    var block = document.createElement('div');
    block.className = (binary[j] === '1') ? 'on' : 'off';
    docFrag.appendChild(block);
  };

  var block = document.createElement('div');
  block.className = 'space';
  docFrag.appendChild(block);

  binary_total += binary + ' ';
}


card.appendChild(docFrag);

console.log(binary_total);
