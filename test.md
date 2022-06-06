方法一：排序
思路与算法

要想组成最大的整数，一种直观的想法是把数值大的数放在高位。于是我们可以比较输入数组的每个元素的最高位，最高位相同的时候比较次高位，以此类推，完成排序，然后把它们拼接起来。这种排序方式对于输入数组 没有相同数字开头 的时候是有效的，例如 [45, 56, 81, 76, 123][45,56,81,76,123]。

下面考虑输入数组 有相同数字开头 的情况，例如 [4,42][4,42] 和 [4,45][4,45]。

对于 [4,42][4,42]，比较 442 > 424442>424，需要把 44 放在前面；
对于 [4,45][4,45]，比较 445 < 454445<454，需要把 4545 放在前面。
因此我们需要比较两个数不同的拼接顺序的结果，进而决定它们在结果中的排列顺序。

由于需要拼接以后才能决定两个数在结果中的先后顺序，NN 个数就有 N!N! 种拼接的可能，我们是不是需要先得到 NN 个数的全排列以后，再选出最大的呢？答案是没有必要。上述排序规则满足传递性，两个元素比较就可以确定它们在排序以后的相对位置关系。下面证明这种排序规则的必要性和充分性。

证明

定义一种非负整数集合上的二元运算，记作 \oplus⊕，它表示将两个数拼接后的结果。

具体地，我们令 s(x)s(x) 表示大于非负整数 xx 的最小的十的整次幂（即当 x>0x>0 时 s(x)=10^{\lfloor \log_{10}x\rfloor + 1}s(x)=10 
⌊log 
10
​
 x⌋+1
 ，特别地，s(0) = 10s(0)=10），那么 x \oplus y = x \times s(y) + yx⊕y=x×s(y)+y。显然这样的运算不满足交换律，但是满足结合律。

然后我们定义一个非负整数集合上的二元关系，记作 \ThetaΘ。当一个数 xx 排在数 yy 前面更优时（即 x \oplus y \geq y \oplus xx⊕y≥y⊕x），我们认为 x \Theta yxΘy。

我们知道，一个序列要能够正确地自定义排序，需要这种排序规则满足传递性（如果 a \Theta baΘb 且 b \Theta cbΘc 则 a \Theta caΘc）和完全性（即 a \Theta baΘb 或 b \Theta abΘa 必满足其一）。只要证明了传递性和完全性，即可证明该排序规则的必要性，完全性很容易证明，传递性证明如下：

由 a \Theta baΘb 且 b \Theta cbΘc 可知：

a \times s(b) + b \geq b \times s(a) + aa×s(b)+b≥b×s(a)+a
b \times s(c) + c \geq c \times s(b) + bb×s(c)+c≥c×s(b)+b
移项整理得：

a \times (s(b) - 1) \geq b \times (s(a) - 1)a×(s(b)−1)≥b×(s(a)−1)
b \times (s(c) - 1) \geq c \times (s(b) - 1)b×(s(c)−1)≥c×(s(b)−1)
两式的左右两边均非负，因此由两式相乘可得：

a \times b \times (s(b) - 1) \times (s(c) - 1) \geq b \times c \times (s(a) - 1) \times (s(b) - 1)a×b×(s(b)−1)×(s(c)−1)≥b×c×(s(a)−1)×(s(b)−1)

不等式两边都有 bb，根据 bb 是否为 00 分类讨论：

当 b = 0b=0 时：

将 b = 0b=0 代入 b \Theta cbΘc 可知：c \geq c \times 10c≥c×10，即 c = 0c=0；

当 c = 0c=0 时，有 a \times s(c) + c \geq c \times s(a) +aa×s(c)+c≥c×s(a)+a，恰符合 a \Theta caΘc 的定义。

当 b > 0b>0 时：

b \times (s(b) - 1)) > 0b×(s(b)−1))>0；

不等式两边同时除以 b \times (s(b) - 1))b×(s(b)−1))，化简得：a \times (s(c) - 1) \geq c \times (s(a) - 1)a×(s(c)−1)≥c×(s(a)−1)，恰符合 a \Theta caΘc 的定义。

综上，有 a \Theta caΘc。

最后我们证明该排序规则的充分性：假设存在一个最优序列不满足该排序规则，那么必然存在至少一对相邻数字 aa 与 bb，我们将 aa 与 bb 交换后新序列的值必然增加，与假设矛盾。因此，满足该排序规则是该序列最优的充分条件。

代码

C++JavaJavaScriptGolangC

class Solution {
public:
    string largestNumber(vector<int> &nums) {
        sort(nums.begin(), nums.end(), [](const int &x, const int &y) {
            long sx = 10, sy = 10;
            while (sx <= x) {
                sx *= 10;
            }
            while (sy <= y) {
                sy *= 10;
            }
            return sy * x + y > sx * y + x;
        });
        if (nums[0] == 0) {
            return "0";
        }
        string ret;
        for (int &x : nums) {
            ret += to_string(x);
        }
        return ret;
    }
};
复杂度分析

时间复杂度：O(n \log n \log m)O(nlognlogm)，其中 nn 是给定序列的长度，mm 是 3232 位整数的最大值，每个数转化为字符串后的长度是 O(\log m)O(logm) 的数量级。排序比较函数的时间复杂度为 O(\log m)O(logm)，共需要进行 O(n \log n)O(nlogn) 次比较。同时我们需要对字符串序列进行拼接，时间复杂度为 O(n \log m)O(nlogm)，在渐进意义上小于 O(n \log n \log m)O(nlognlogm)。

我们也可以对排序比较函数进行优化，如预处理出数组每一个数的大于它的最小的十的整次幂，这样可用将时间复杂度降低到 O(n \log n)O(nlogn)，但这样会使得空间复杂度上升到 O(n)O(n)。我们也可以使用数学方法加速计算整次幂，如二分计算等，但这种优化常数较大，最终耗时不一定更短。
空间复杂度：O(\log n)O(logn)，排序需要 O(\log n)O(logn) 的栈空间。

下一篇：【宫水三叶の相信科学系列】为什么根据「拼接结果的字典序大小」决定「其在序列里的相对关系」是正确的
© 著作权归作者所有
258
条评论

最热

编辑
预览







评论
精选评论(5)

maomao
L3
2021-04-12
class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        # 第一步：定义比较函数，把最大的放左边
        # 第二步：排序
        # 第三步：返回结果
        def compare(x, y): return int(y+x) - int(x+y)
        nums = sorted(map(str, nums), key=cmp_to_key(compare))
        return "0" if nums[0]=="0" else "".join(nums)
96
踩
查看 20 条回复
回复

frewen
2021-04-11
4月12日每日一题？

67
踩
查看 3 条回复
回复

Ryan
L3
2021-04-12
Java六行

class Solution {
    public String largestNumber(int[] nums) {
        PriorityQueue<String> heap = new PriorityQueue<>((x, y) -> (y + x).compareTo(x + y));
        for(int x: nums) heap.offer(String.valueOf(x));
        String res = "";
        while(heap.size() > 0) res += heap.poll();
        if(res.charAt(0) == '0') return "0";
        return res;
    }
}
62
踩
查看 7 条回复
回复

GolangBoy
L3
（编辑过）2021-04-12
这么严格的数学证明比赛/面试的时候咋想得出来的。。

46
踩
查看 10 条回复
回复

梦璃夜·天星

L5
（编辑过）2021-04-12
之前做过了，直接点了提交，还有印象，自定义排序 A+B < B+A

class Solution {
public:
    /*static bool cmp(string& a, string& b){
        return a + b > b + a;
    }*/
    string largestNumber(vector<int>& nums) {
        vector<string>cpy;
        for(auto x: nums){
            cpy.push_back(to_string(x));
        }
        //sort(cpy.begin(), cpy.end(), cmp);
         sort(cpy.begin(), cpy.end(), [](const string& a, const string& b){
            return a + b > b + a;
        });
        string ans;
        bool start = 1;
        for(auto x: cpy){
            if(start){
                if(x == "0"){
                    continue;
                }
                else{
                    start = 0;
                }
            }
            ans += x;
        }
        return ans.size() ? ans : "0";
    }
};
———————— 简洁点，这么写就挺好的，性能比较高

class Solution {
public:
    string largestNumber(vector<int>& nums) {
        vector<string>cpy;
        for(auto x: nums) cpy.push_back(to_string(x));
        sort(cpy.begin(), cpy.end(), [](const string& a, const string& b){ return a + b > b + a; });
        if(cpy[0] == "0")return "0";
        string ans;
        for(auto& x: cpy)ans += x;
        return ans;
    }
};
如果再简化，会因为c++字符串拼接和拷贝，会产生很多额外的开销，不推荐对字符串使用这种操作（求和）

class Solution {
public:
    string largestNumber(vector<int>& nums) {
        vector<string>cpy;
        for(auto x: nums) cpy.push_back(to_string(x));
        sort(cpy.begin(), cpy.end(), [](const string& a, const string& b){ return a + b > b + a; });
        return cpy[0] == "0" ? "0" : accumulate(begin(cpy), end(cpy), string());
    }
};


179.
输入：nums = [3,30,34,5,9]
输出："9534330"

var largestNumber = function(nums) {
  nums.sort((x, y) => {
    let sx = 10, sy = 10;
    while (sx <= x) {
        sx *= 10;
    }
    while (sy <= y) {
        sy *= 10;
    }
    <!-- console.log(sx,sy); -->
    console.log(('' + (sx * y + x)), '|' , ('' + (sy * x + y)) )
    return '' + (sx * y + x) - ('' + (sy * x + y));
  })
  console.log(nums);
  if (nums[0] === 0) {
      return '0';
  }
  return nums.join('');
};

输入：[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3 

var findRepeatNumber = function(nums) {
    for (let i = 0 ; i< nums.length; i++){
        if(nums.find((e) => e== nums[i] !==-1)){
            return nums[i]
        }
    }
};


在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]


var findNumberIn2DArray = function(matrix, target) {
  matrix.flat().find(e=>target==e)
};