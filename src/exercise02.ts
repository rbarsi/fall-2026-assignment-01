export class InvalidNucleotide extends Error{
  constructor(nucleotide: string) {
    super(`Invalid nucleotide: ${nucleotide}`);
    this.name = "InvalidNucleotide";
  }
}

export function transcribeDNA(dna: string): string {
  let rna = "";

  for (const nucleotide of dna) {
    switch (nucleotide) {
      case "A":
        rna += "U";
        break;

      case "T":
        rna += "A";
        break;

      case "C":
        rna += "G";
        break;

      case "G":
        rna += "C";
        break;

      default:
        throw new InvalidNucleotide(nucleotide);
    }
  }
  return rna;
}
