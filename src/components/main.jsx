function Main({children}) {
    return (
        <main className="pb-10 pt-4 bg-[#F5F3EF] border-t border-t-[#E0DBD4] flex-1">
            <div className="container mx-auto px-10 md:px-20 lg:px-30">
                {children}
            </div>
        </main>
    )
}

export default Main