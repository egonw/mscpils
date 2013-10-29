var countTheANucleotides = function(dnaSequence) {
  count = 0
  // iterate over all nucleotides in the DNA string
  for (var i=0; i<dnaSequence.length; i++) {
    if (dnaSequence[i] == "A") count = count +1 
  }
  return count
}

test( "counting tests", function() {
  equal(1, countTheANucleotides("AGCT"));
  equal(4, countTheANucleotides("AAAA"));
  equal(0, countTheANucleotides("GCGC"));
});

