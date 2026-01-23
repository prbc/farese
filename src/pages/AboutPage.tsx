export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#003052] py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            About Farese.com
          </h1>
          <p className="text-xl text-[#adddff] italic">
            "It is good for me that I have been afflicted"
          </p>
        </div>

        {/* Memorial Banner with Photo */}
        <div className="bg-[#0067b2] rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src="/img/johnny/johnf.jpg"
                alt="John 'Johnny' Farese"
                className="w-48 h-48 object-cover rounded-lg shadow-lg border-4 border-white/20"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold text-white mb-2">
                In Memory of John "Johnny" Farese
              </h2>
              <p className="text-[#adddff] text-lg">
                August 27, 1956 – August 16, 2014
              </p>
              <p className="text-white/80 mt-2">
                Founder of this Reformed Baptist Church Directory
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Scripture */}
          <div className="bg-[#0083e0]/20 rounded-lg p-6 mb-8">
            <blockquote className="text-[#adddff] italic text-lg leading-relaxed">
              "It is good for me that I have been afflicted, That I may learn Your statutes.
              The law of Your mouth is better to me Than thousands of coins of gold and silver.
              Your hands have made me and fashioned me; Give me understanding, that I may learn
              Your commandments. Those who fear You will be glad when they see me, Because I
              have hoped in Your word. I know, O LORD, that Your judgments are right, And that
              in faithfulness You have afflicted me."
            </blockquote>
            <p className="text-gray-400 text-right mt-4">— Psalm 119:71-75</p>
          </div>

          {/* Testimony */}
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Testimony of John Farese
            </h2>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                John Farese lived in Florida with his brother Paul and sister-in-law Janis
                and their four children. Despite being disabled since birth and paralyzed
                in both arms and legs, he enjoyed a very productive life, was keenly
                interested in a variety of sports, and had a special involvement in
                information technology, including the maintenance of his own Web site.
              </p>

              <p>
                Johnny came into this world on August 27, 1956, the second of Vincent and
                Joan Farese's seven children. His older brother Bernie was born with spinal
                muscular atrophy, a severely crippling disease that meant that he was never
                able to walk. So was Johnny - and a younger sister Tina. In each case, the
                doctors told their parents that the child concerned would not live beyond
                its eighth birthday. Tina died of pneumonia when she was four years old.
              </p>

              <p>
                Brought up as a Roman Catholic, Johnny quietly accepted the doctrines taught
                to him by his parents and the parish priest. At one stage he was told that
                if he recited forty-five prayers from a particular Catholic prayer book every
                day for a whole year he would escape the pains of purgatory and hell. He
                never missed a day - but had no assurance that his discipline would pay off.
              </p>

              <p>
                Johnny's early years were spent in suburban Boston, Massachusetts, but when
                he was fifteen his father's business relocated the family to Florida. Four
                months after moving to Fort Lauderdale, their next door neighbor invited his
                mother to a home Bible study. The Bible study leader's son, then a freshman
                at Florida Bible College, came to talk about the Christian faith to Johnny
                and his brother Bernie.
              </p>

              <p>
                While Bernie experienced a dramatic conversion, Johnny spent the next twelve
                years pursuing a lifestyle of gambling, drinking, and other destructive habits -
                determined not to let his disability keep him from "enjoying" life to the full.
                Yet there was emptiness and pain that nothing could fill.
              </p>

              <p>
                When his younger brother Paul also became a committed Christian, Johnny knew
                in his heart that he needed to change. Bernie gave him a Bible, which sat
                unopened on a shelf for six months. Eventually, the nagging thoughts became
                so strong that he began to read it, starting at the first page.
              </p>

              <p>
                It was while reading the Sermon on the Mount that God opened Johnny's eyes
                to the truth about his sin, the inability of religion to deal with it, and
                the need to repent and trust in Jesus Christ as his own personal Saviour.
                As he did, he was given an assurance that his sins had been forgiven and
                that he had become a true child of God.
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">
                On Suffering
              </h3>

              <p>
                Johnny often spoke about how he viewed his physical condition: "I have come
                to see that suffering is one of the many ways in which God demonstrates his
                unfailing love to those who have come to put their trust in him. Writing out
                of his own painful experience, the Psalmist says, 'It was good for me to be
                afflicted, so that I might learn your decrees' (Psalm 119:71) - and I gladly
                endorse every word of that testimony."
              </p>

              <p>
                "Among other things, suffering empties us of pride and self-dependence, and
                makes us realize our complete dependence upon God. When we reach the point
                where we have nowhere to turn except to God, we begin to get a clearer view
                of who and what he is. Day by day, I am discovering more and more of his
                wisdom, love and grace. I am also finding that God's power is made perfect
                in my weakness, and that 'when I am weak, then I am strong' (2 Corinthians 12:10)."
              </p>

              <p>
                "Although I am bedridden, struggle to breathe comfortably, and often have to
                contend with painful bed sores, I count them as 'light and momentary troubles'
                (2 Corinthians 4:17). For all the difficulties they cause, I know that they
                are achieving for me 'an eternal glory that far outweighs them all.' How
                trivial they will all seem in the light of the eternal bliss that awaits
                God's children in the world to come!"
              </p>

              <h3 className="text-xl font-semibold text-white mt-8 mb-4">
                This Directory
              </h3>

              <p>
                Using a speech recognition computer system, Johnny served Jesus Christ through
                the Internet on his web pages, designed to provide information and links to
                Reformed Baptist Resources. The crown jewel of his work was this directory of
                Reformed Baptist churches holding to the 1689 London Baptist Confession of Faith.
              </p>

              <p>
                Though Johnny went to be with the Lord on August 16, 2014, his legacy continues
                through this directory, helping Christians find faithful churches when considering
                a move or planning a trip.
              </p>
            </div>
          </div>

          {/* Scripture Footer */}
          <div className="mt-12 text-center">
            <p className="text-[#adddff] italic">
              "Come and listen, all you who fear God; let me tell you what he has done for me."
            </p>
            <p className="text-gray-400 text-sm mt-2">— Psalm 66:16</p>
          </div>
        </div>
      </div>
    </div>
  );
}
