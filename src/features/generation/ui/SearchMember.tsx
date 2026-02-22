'use client';
import { useState } from 'react';
import { Search, Loader2, Check, AlertCircle } from 'lucide-react';
import { Member, useSearchMember } from 'entities/member';

interface SearchMemberProps {
  initialName?: string;
  onSelect: (member: Member) => void;
  isPending?: boolean;
}
export const SearchMember = ({ initialName = '', onSelect, isPending }: SearchMemberProps) => {
  const [query, setQuery] = useState(initialName);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { data: searchResults, isLoading, isFetching, isError } = useSearchMember(query, shouldSearch);

  const handleSearch = () => {
    if (!query.trim() || query.trim().length < 2) return;

    setHasSearched(true);
    setShouldSearch(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedId(null);
    setShouldSearch(false);
    if (hasSearched) setHasSearched(false);
  };

  const handleSelect = (member: Member) => {
    setSelectedId(member.member_id);
    setQuery(member.name);

    setShouldSearch(false);
    setHasSearched(false);
    onSelect(member);
  };

  const isSearching = isLoading || isFetching;
  const noResults = hasSearched && !isSearching && searchResults?.length === 0;

  return (
    <div className="relative space-y-3">
      <label className="flex items-center gap-2 px-1 text-xs font-bold text-slate-400">역할을 추가할 동아리원 이름 검색</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            disabled={isPending || isSearching}
            className={`w-full rounded-2xl border bg-slate-50 px-3 py-3 pl-5 text-sm transition-all outline-none ${
              selectedId ? 'border-emerald-500/50' : 'border-slate-100 focus:border-emerald-500'
            } ${noResults ? 'border-amber-400' : ''}`}
            placeholder="이름을 입력하세요 (2글자 이상)"
            value={query}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          disabled={isPending || isSearching || query.trim().length < 2}
          className="flex items-center justify-center rounded-2xl bg-emerald-400 px-6 text-white transition-all hover:bg-emerald-500 active:scale-95 disabled:bg-slate-200 disabled:text-slate-400"
        >
          {isSearching ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
        </button>
      </div>

      <div className="min-h-5 px-1">
        {noResults && (
          <p className="animate-in fade-in slide-in-from-top-1 flex items-center gap-1 text-xs font-bold text-amber-500">
            <AlertCircle size={12} /> 해당 이름의 동아리원을 찾을 수 없습니다.
          </p>
        )}
        {isError && (
          <p className="flex items-center gap-1 text-xs font-bold text-red-500">
            <AlertCircle size={12} /> 검색 중 오류가 발생했습니다. 다시 시도해주세요.
          </p>
        )}
        {selectedId && !hasSearched && (
          <p className="animate-in zoom-in-95 flex items-center gap-1 text-xs font-bold text-emerald-600">
            <Check size={12} /> 선택됨: {query} (ID: {selectedId})
          </p>
        )}
      </div>

      {hasSearched && searchResults && searchResults.length > 0 && (
        <div className="animate-in fade-in zoom-in-95 absolute z-50 -mt-8 max-h-52 w-full overflow-y-auto rounded-xl border border-slate-100 bg-white shadow-2xl">
          {searchResults.map((m) => (
            <SearchItem key={m.member_id} member={m} onSelect={handleSelect} selectedId={selectedId} />
          ))}
        </div>
      )}
    </div>
  );
};

const SearchItem = ({ member, onSelect, selectedId }: { member: Member; onSelect: (member: Member) => void; selectedId: number | null }) => {
  return (
    <button
      key={member.member_id}
      type="button"
      onClick={() => onSelect(member)}
      className="flex w-full items-center justify-between border-b border-slate-50 px-5 py-2.5 text-sm transition-colors last:border-none hover:bg-indigo-50/50"
    >
      <div className="flex flex-row items-center">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
          {member.profileImage ? (
            <img src={member.profileImage} alt={member.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200 text-xl text-slate-400">{member.name.charAt(0)}</div>
          )}
        </div>
        <div className="ml-3 flex flex-col items-start">
          <span className="font-bold text-slate-900">{member.name}</span>
          <span className="text-[10px] font-medium text-slate-400">ID : {member.member_id}</span>
        </div>
      </div>
      <Check size={16} className={selectedId === member.member_id ? 'text-emerald-500' : 'text-slate-100'} />
    </button>
  );
};
