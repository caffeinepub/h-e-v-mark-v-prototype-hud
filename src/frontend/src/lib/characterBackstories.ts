export interface CharacterBackstory {
  name: string;
  biography: string;
  role: string;
  achievements: string[];
  context: string;
}

export const characterBackstories: Record<string, CharacterBackstory> = {
  'Gordon Freeman': {
    name: 'Dr. Gordon Freeman',
    biography: 'Theoretical physicist with a Ph.D. from MIT. Employed at Black Mesa Research Facility in the Anomalous Materials department. Age 27 at time of Black Mesa Incident.',
    role: 'Research Associate - Anomalous Materials Laboratory',
    achievements: [
      'Doctorate in Theoretical Physics from MIT',
      'Published research on teleportation theory',
      'Survived the Black Mesa Incident',
      'Defeated the Nihilanth',
      'Led resistance against Combine occupation',
    ],
    context: 'Subject of prophecy among Vortigaunts. Known as "The One Free Man" by resistance forces. Placed in stasis by G-Man following Black Mesa Incident.',
  },
  'Barney Calhoun': {
    name: 'Barney Calhoun',
    biography: 'Black Mesa Security Force officer assigned to the Sector C Test Labs and Facilities. Former police academy graduate who joined Black Mesa security detail.',
    role: 'Security Officer - Level 3 Clearance',
    achievements: [
      'Survived Black Mesa Incident',
      'Escaped Black Mesa via freight train',
      'Infiltrated Combine Civil Protection',
      'Key member of City 17 resistance',
      'Assisted in Combine Citadel assault',
    ],
    context: 'Close friend of Gordon Freeman. Operated undercover as CP officer "Barney" in City 17. Helped organize underground railroad for refugees.',
  },
  'Alyx Vance': {
    name: 'Alyx Vance',
    biography: 'Daughter of Dr. Eli Vance. Born shortly before Black Mesa Incident. Raised in resistance movement following Combine invasion. Skilled hacker and engineer.',
    role: 'Resistance Fighter - Technical Specialist',
    achievements: [
      'Rescued from Black Mesa by Gordon Freeman',
      'Developed EMP tool and gravity gun modifications',
      'Infiltrated Nova Prospekt',
      'Survived Hunter attack',
      'Defeated Combine Advisors',
    ],
    context: 'Saved from Black Mesa as infant by Gordon Freeman. Raised by resistance after mother\'s death. Bonded with Dog, modified Combine robot.',
  },
  'Isaac Kleiner': {
    name: 'Dr. Isaac Kleiner',
    biography: 'Former MIT professor and Black Mesa senior researcher. Mentor to Gordon Freeman. Specialist in quantum mechanics and teleportation technology.',
    role: 'Senior Researcher - Anomalous Materials',
    achievements: [
      'Pioneered teleportation research at Black Mesa',
      'Survived Black Mesa Incident',
      'Established resistance laboratory in City 17',
      'Developed local teleportation technology',
      'Broadcast resistance message worldwide',
    ],
    context: 'Maintains laboratory in City 17 with pet headcrab Lamarr. Key scientific advisor to resistance. Former colleague of Eli Vance and Wallace Breen.',
  },
  'Eli Vance': {
    name: 'Dr. Eli Vance',
    biography: 'Senior researcher at Black Mesa. Father of Alyx Vance. Lost his leg during Black Mesa Incident. Leader of resistance scientific efforts.',
    role: 'Senior Researcher - Anomalous Materials',
    achievements: [
      'Pioneered teleportation research',
      'Escaped Black Mesa with infant daughter',
      'Established White Forest resistance base',
      'Developed rocket to close Combine portal',
      'Mentored multiple generations of scientists',
    ],
    context: 'Husband of Azian Vance (deceased). Close friend of Isaac Kleiner. Killed by Combine Advisor but later saved by Alyx in alternate timeline.',
  },
};

export function getCharacterBackstory(name: string): CharacterBackstory | null {
  // Normalize the name for matching
  const normalizedName = name.trim();
  return characterBackstories[normalizedName] || null;
}
