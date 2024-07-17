// import React from 'react';

// interface Item {
//   name: string;
//   color: string;
// }

// interface Outfit {
//   top: Item;
//   bottom: Item;
//   shoes: Item;
//   accessories: number;
// }

// interface OutfitHistoryProps {
//   history: Outfit[];
//   selectOutfit: (outfit: Outfit) => void;
// }

// const OutfitHistory: React.FC<OutfitHistoryProps> = ({ history, selectOutfit }) => {
//   return (
//     <div>
//       <h2>過去のコーディネート</h2>
//       {history.length === 0 ? (
//         <p>履歴はありません</p>
//       ) : (
//         <ul>
//           {history.map((outfit, index) => (
//             <li key={index} onClick={() => selectOutfit(outfit)}>
//               <p style={{ color: outfit.top.color }}>トップス: {outfit.top.name}</p>
//               <p style={{ color: outfit.bottom.color }}>ボトムス: {outfit.bottom.name}</p>
//               <p style={{ color: outfit.shoes.color }}>シューズ: {outfit.shoes.name}</p>
//               <p>アクセサリーの数: {outfit.accessories}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default OutfitHistory;

