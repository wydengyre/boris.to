import stanza
from stanza import DownloadMethod


def main():
	nlp = stanza.Pipeline('en', download_method=DownloadMethod.NONE)
	doc = nlp("Barack Obama was born in Hawaii.")
	for sentence in doc.sentences:
		for word in sentence.words:
			print(word.text, word.lemma, word.upos, word.xpos, word.feats, word.head, word.deprel, word.misc)


if __name__ == "__main__":
	main()
