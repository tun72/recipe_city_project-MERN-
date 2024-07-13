function RecipeLayout({children, isSplit=false}) {

    return (
        <div className={`grid ${isSplit ? "grid-cols-2" : "grid-cols-1"} gap-4 w-[80%]  mx-auto`}>
              {children}
        </div>
    )
}

export default RecipeLayout
