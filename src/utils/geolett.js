import contextTypes from 'data/geolett.json';
import tree from '../assets/gfx/oak-tree.svg'

export function getContextType(filter) {
   const contextType = contextTypes.find(filter);

   if (!contextType) {
      return null;
   }

   return {
      title: contextType.tittel,
      description: contextType.forklarendeTekst,
      possibleActions: contextType.muligeTiltak.split('\n'),      
      links: contextType.lenker?.map(link => ({ title: link.tittel, url: link.href })) || [],
      icon: {tree}
   };
}