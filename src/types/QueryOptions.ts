export type QueryOptions = {
    currentPage?: number,
    pageSize?: number,
    orderPropertyName?: string;
    descendingOrder?: boolean;
    searchPropertyName?: string;
    searchTerm?: string;
}


/*
*  public int CurrentPage { get; set; } = 1;
        public int PageSize { get; set; } = 25;
        public string? OrderPropertyName { get; set; }
        public bool DescendingOrder { get; set; }
        public string? SearchPropertyName { get; set; }
        public string? SearchTerm { get; set; }
*
*
* */